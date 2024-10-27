"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
   getUser: () => void;
}

export default function RedeemCodeCard({ getUser }: Props) {
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
            getUser();
         } else {
            toast.error("Failed to redeem the code...", {
               description: `${resData.message}`,
            });
         }
      } catch (error) {
         console.error(error);
      }
   }
   return (
      <Card>
         <CardHeader>
            <CardTitle>Redeem Referral Code</CardTitle>
            <CardDescription>Redeem a code from friend here.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
               {user?.customer.hasRedeemedRefCode ? (
                  <div className="flex items-center space-x-2">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                           Code:
                        </Label>
                        <Input
                           id="name"
                           placeholder="Code redeemed"
                           className="col-span-3"
                           value={refCode}
                           onChange={(e) => setRefCode(e.target.value)}
                           disabled
                        />
                     </div>
                     <Button type="submit" disabled>
                        Redeem
                     </Button>
                  </div>
               ) : (
                  <div className="flex items-center space-x-2">
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
                     <Button type="submit" onClick={handleSubmit}>
                        Redeem
                     </Button>
                  </div>
               )}
            </div>
         </CardContent>
         <CardFooter></CardFooter>
      </Card>
   );
}
