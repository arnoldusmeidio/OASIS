"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
   getUser: () => void;
}

export default function RefCodeCard({ getUser }: Props) {
   const { user } = useUserStore();
   const myRefCode = user?.customer?.refCode || "";

   const handleCopyClick = async () => {
      try {
         await window.navigator.clipboard.writeText(myRefCode);
         toast("Copied to clipboard!");
      } catch (err) {
         console.error("Unable to copy to clipboard.", err);
         toast.error("Copy to clipboard failed.");
      }
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
            <CardDescription>Share your code to friends to redeem points.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
               <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                     Referral Code
                  </Label>
                  <Input id="link" defaultValue={user?.customer?.refCode} readOnly />
               </div>
               <Button type="submit" size="sm" className="px-3" onClick={handleCopyClick}>
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
               </Button>
               <Link
                  href={`https://api.whatsapp.com/send?text=Redeem my code on Oasis Resort! Code: *${user?.customer?.refCode}*`}
                  target="_blank"
               >
                  <FaSquareWhatsapp className="hover:bg-accent/90 hover:text-primary/90 h-[42px] w-[42px]" />
               </Link>
            </div>
         </CardContent>
         <CardFooter></CardFooter>
      </Card>
   );
}
