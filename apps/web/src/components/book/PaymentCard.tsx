"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

export default function BookingCheckout({ className, ...props }: CardProps) {
   const router = useRouter();
   const params = useParams();
   const roomId = params.slug;

   //midtrans
   useEffect(() => {
      const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", myMidtransClientKey as string);

      document.body.appendChild(script);

      return () => {
         document.body.removeChild(script);
      };
   }, []);

   const methods = [
      {
         title: "Manual Transfer",
         description: "Transfer to designated bank account. You are REQUIRED to upload payment proof.",
      },
      {
         title: "Oasis Wallet",
         description: "Pay using your digital wallet in OASIS website.",
      },
      {
         title: "Payment Gateway",
         description: "Pay using midtrans.",
         function: async (ev: React.MouseEvent<HTMLButtonElement>) => {
            ev.preventDefault();
            try {
               const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/payments/${roomId}`, {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  credentials: "include",
               });
               const data = await response.json();

               router.push(data.data.transaction.redirect_url);
            } catch (error) {
               console.error(error);
            }
         },
      },
   ];
   return (
      <Card className={cn("w-[380px]", className)} {...props}>
         <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Please select the payment method.</CardDescription>
         </CardHeader>
         <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
               <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">NOTE</p>
                  <p className="text-muted-foreground text-sm">Payment method CANNOT be changed afterwards!</p>
               </div>
            </div>
            <div>
               {methods.map((method, index) => (
                  <div key={index} className="grid-cols mb-4 grid items-start pb-4 last:mb-0 last:pb-0">
                     <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">✓ {method.title}</p>
                        <p className="text-muted-foreground text-sm">{method.description}</p>
                        <Button className="w-full" onClick={method.function}>
                           Pay with {method.title}
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
         <CardFooter></CardFooter>
      </Card>
   );
}
