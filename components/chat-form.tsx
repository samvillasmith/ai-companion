"use client";

import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatFormProps {
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    isLoading: boolean;
}

export const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading
}: ChatFormProps) => {
    return ( 
        <div>
            <form onSubmit={onSubmit} 
            className="border-t border-primary/10 py-4 flex items-center gap-x-2">
                <Input 
                    disabled={isLoading}
                    value={input}
                    placeholder="Type a message to your Synth"
                    className="rounded-lg bg-primary/10"
                    onChange={handleInputChange} // Add this line
                />
                <Button disabled={isLoading}variant="ghost">
                    <SendHorizonal className="h-6 w-6"/>
                </Button>
            </form>
        </div>
     );
}
