"use client";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";

interface Props {
   getUser: () => void;
}

export default function RedeemRefCode({ getUser }: Props) {
   const { user } = useUserStore();
   const [refCode, setRefCode] = useState("");

   async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): Promise<void | undefined> {
      e.preventDefault();

      const data = { refCode };

      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/wallets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
         });

         const resData = await res.json();
         if (resData.ok) {
            toast("Successfully redeemed the code!", {
               description: "Earned 10000 points!",
            });
         } else {
            toast("Failed to redeem the code...", {
               description: `${resData.message}`,
            });
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            {user?.customer.hasRedeemedRefCode ? (
               <Button type="button" variant={"secondary"} size={"sm"} disabled>
                  Redeem Code
               </Button>
            ) : (
               <Button type="button" variant={"secondary"} size={"sm"}>
                  Redeem Code
               </Button>
            )}
         </DialogTrigger>
         <DialogContent className="w-[375px]">
            <DialogHeader>
               <DialogTitle>Redeem Referral Code</DialogTitle>
               <DialogDescription>Redeem a code from friend here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Code:
                  </Label>
                  <Input
                     id="name"
                     placeholder="Enter 12 digit code"
                     className="col-span-3"
                     value={refCode}
                     onChange={(e) => setRefCode(e.target.value)}
                  />
               </div>
            </div>
            <DialogFooter className="sm:justify-between">
               <DialogClose asChild>
                  <Button type="button" variant="secondary">
                     Close
                  </Button>
               </DialogClose>
               {user?.customer.hasRedeemedRefCode ? (
                  <Button type="submit" disabled>
                     Redeem
                  </Button>
               ) : (
                  <Button type="submit" onClick={handleSubmit}>
                     Redeem
                  </Button>
               )}
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
