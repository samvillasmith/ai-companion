"use client";

import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export const PremiumModal = () => {
    const premiumModal = usePremiumModal();

    return(
        <Dialog open={premiumModal.isOpen} onOpenChange={premiumModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade to Premium
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}