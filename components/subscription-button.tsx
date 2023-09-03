"use client";

import axios from "axios";
import { Sparkle } from "lucide-react";
import { useState } from "react";
import { boolean } from "zod";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface SubscriptionButtonProps {
    isPremium: boolean;
}

export const SubscriptionButton = ({
    isPremium = false
}: SubscriptionButtonProps) =>{
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    
    const onClick = async()=>{
        try{
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch(error){
            toast({
                variant: "destructive",
                description: "An error occurred"
            })
        } finally{
            setLoading(false)
        }
    }
    return(
    <Button onClick={onClick} disabled={loading} size="sm" variant={isPremium ? "default" : "premium"}>
        {isPremium ? "Manage Subscription" : "Upgrade"}
        {!isPremium && <Sparkle className="h-4 w-4 ml-2 fill-white" />}
    </Button>
    )
}