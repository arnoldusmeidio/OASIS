"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { currency } from "@/helpers/currency";
import { useUserStore } from "@/stores/useUserStore";
import useCurrencyStore from "@/stores/useCurrencyStore";
import { WalletTypes } from "@/types/wallet";
import { Skeleton } from "../ui/skeleton";
import WalletCard from "./WalletCard";

export default function WalletHistoryCard() {
   const { currencyRate, error, getCurrencyRate } = useCurrencyStore();
   const { user } = useUserStore();
   const [currencyLoading, setCurrencyLoading] = useState(true);

   const [isLoading, setIsLoading] = useState(true);
   const [walletData, setWalletData] = useState<WalletTypes>();
   const eventGetter = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/wallets`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
         });

         const resData = await res.json();
         if (resData.ok) {
            setWalletData(resData.data);
         }
         setIsLoading(false);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      eventGetter();
   }, []);

   useEffect(() => {
      if (user?.currency && user.currency != "IDR") {
         setCurrencyLoading(true);
         getCurrencyRate();
         setCurrencyLoading(false);
      } else {
         setCurrencyLoading(false);
      }
   }, [user?.currency, getCurrencyRate]);

   return (
      <>
         {isLoading || !walletData ? (
            // <h1>Loading...</h1>
            <Skeleton className="h-[750px] w-full" />
         ) : (
            <div className="flex h-full w-full flex-col gap-4 self-start p-8">
               <div className="flex w-[50%] self-center">
                  <WalletCard eventGetter={eventGetter} walletData={walletData} />
               </div>
               {walletData?.walletHistory?.map((e, index: number) => (
                  <div key={e.id}>
                     <Card className="w-full shadow-md">
                        <CardHeader>
                           <CardTitle>{e.types}</CardTitle>
                           <CardDescription>{format(e.createdAt, "LLL dd, y")}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                           <div>
                              <div className="grid-cols mb-4 grid items-start pb-4 last:mb-0 last:pb-0">
                                 <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                       {currencyLoading
                                          ? "Loading..."
                                          : !currencyRate
                                            ? currency(e.value, "IDR", 1)
                                            : currency(e.value, user?.currency, currencyRate)}
                                    </p>
                                    <p className="text-muted-foreground text-sm">{e.description}</p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                        <CardFooter className="flex gap-4"></CardFooter>
                     </Card>
                  </div>
               ))}
            </div>
         )}
      </>
   );
}
