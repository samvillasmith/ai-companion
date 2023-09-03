"use client";

// PremiumModal.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";

export const PremiumModal = () => {
  const premiumModal = usePremiumModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true)
  }, [])

  if(!isMounted){
    return null;
  }

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={premiumModal.isOpen} onOpenChange={premiumModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create<span className="text-sky-500 mx-1 font-medium">Custom AI</span>Synth Companions
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9
            <span className="text-sm font-normal">
              .99 per month
            </span>
          </p>
          <Button disabled={loading} onClick={onSubscribe} variant="premium">
            Subscribe
          </Button>
        </div>
        <Separator />
        <div className="text-center space-y-4">
          <p className="text-xl font-medium">Premium Features:</p>
          <ul className="list-inside space-y-2">
            <li>
              🤖 <span className="font-medium">Custom AI Synth Companions</span>: Craft your own AI companions with personalities tailored to you!
            </li>
            <li>
              🌈 <span className="font-medium">Specialized Categories</span>: Create as many companions as you want across 11 unique categories!
            </li>
            <li>
              🚀 <span className="font-medium">Freedom to Experiment</span>: Mix and match features to create the ultimate AI experience!
            </li>
            <li>
              📆 <span className="font-medium">Cancel Anytime</span>: No strings attached, cancel your subscription whenever you want!
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
