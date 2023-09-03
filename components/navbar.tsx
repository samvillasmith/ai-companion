"use client";

import { Menu, Sparkles} from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from '@/components/theme-toggle'
import { MobileSidebar } from "./mobile-sidebar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { usePremiumModal } from "@/app/hooks/use-premium-modal";


const font = Poppins({
    weight: "600",
    subsets: ["latin"]
});

interface NavBarProps {
    isPremium: boolean;
}

export const Navbar = ({
    isPremium
}: NavBarProps) => {

    const premiumModal = usePremiumModal();

    return(
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSidebar isPremium={isPremium}/>
                <Link href="/"/>
                <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary",
                font.className)}> 
                    SoulSynth.AI
                </h1>
            </div>
            <div className="flex items-center gap-x-3">
                {!isPremium && (
                <Button onClick={premiumModal.onOpen} variant="premium" size="sm">
                    Upgrade 
                    <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
                </Button>
                )}
                <ModeToggle />
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
};