import { Categories } from "@/components/categories";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const maxDuration = 300; 
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  return new Response('{}', { status: 200 });
}

export async function POST(req: Request){
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!src || !name || !description || !seed || !instructions || !categoryId){
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const isPremium = await checkSubscription();

        if(!isPremium){
            return new NextResponse("Premium subscription required", { status: 403});
        }

        const companion = await prismadb.companion.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }
        })
        return NextResponse.json(companion);
    } catch(error){
        console.log("[COMPANION_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
