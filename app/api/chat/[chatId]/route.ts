import { StreamingTextResponse, LangChainStream } from "ai";
import { auth, currentUser } from "@clerk/nextjs";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const maxDuration = 300; 
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  return new Response('{}', { status: 200 });
}

export async function POST(
    request: Request,
    { params }: { params: { chatId: string } }
) {
    try {
        const { prompt } = await request.json();
        const user = await currentUser();

        if(!user || !user.id){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const identifier = request.url + "-" + user.id;
        const { success } = await rateLimit(identifier);

        if(!success){
            return new NextResponse("Rate limit exceeded", { status: 429 });
        }

        const companion = await prismadb.companion.update({
            where: {
                id: params.chatId
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: user.id
                    }
                }
            }
        });

        if(!companion){
            return new NextResponse("Synth companion not found", { status: 404 })
        }

        const name = companion.id;
        const companion_file_name = name + ".txt"

        const companionKey = {
            companionName: name,
            userId: user.id,
            modelName: "llama-2-70b"
        }

        const memoryManager = await MemoryManager.getInstance();
        const records = await memoryManager.readLatestHistory(companionKey);

        if(records.length === 0){
            await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey)
        }

        await memoryManager.writeToHistory("User: " + prompt + "\n\n", companionKey);

        const recentChatHistory = await memoryManager.readLatestHistory(companionKey);

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            companion_file_name
        );

        let relevantHistory = "";

        if(!!similarDocs && similarDocs.length !==0){
            relevantHistory = similarDocs.map((doc)=> doc.pageContent).join("\n");
        }

        const { handlers } = LangChainStream();

        const model = new Replicate({
            model: "meta/llama-2-70b-chat:2d19859030ff705a87c746f7e96eea03aefb71f166725aee39692f1476566d48",
            input: {
                max_length: 2048
            },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers),
        })
        
        model.verbose = true;

        const resp = String(
            await model
              .call(
                `
              ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 
      
              ${companion.instructions}
      
              Below are relevant details about ${companion.name}'s past and the conversation you are in.
              ${relevantHistory}
      
      
              ${recentChatHistory}\n${companion.name}:`
              )
              .catch(console.error)
          );

        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n");
        const response = chunks[0];

        await memoryManager.writeToHistory("" + response.trim(), companionKey);
        var Readable = require("stream").Readable;

        let s = new Readable();
        s.push(response);
        s.push(null);

        if(response !== undefined && response.length > 1){
            memoryManager.writeToHistory("" + response.trim(), companionKey);


        await prismadb.companion.update({
            where: {
                id: params.chatId,
            },
            data: {
                messages: {
                    create: {
                        content: response.trim(),
                        role: "system",
                        userId: user.id,
                    },
                },
            }
        });
    }
        return new StreamingTextResponse(s);
        
        } catch (error){
            console.log("[CHAT_POST]", error);
            return new NextResponse("Internal Error", { status: 500 });
    }
};
