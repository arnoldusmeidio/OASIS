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
import { useUserStore } from "@/stores/useUserStore";
import { useState, useEffect } from "react";
import { currency } from "@/lib/currency";
import { useTranslations } from "next-intl";

interface Props {
   getUser: () => void;
}

export default function WalletCard({ getUser }: Props) {
   const { user } = useUserStore();
   const [currencyLoading, setCurrencyLoading] = useState(true);
   const [currencyRates, setCurrencyRates] = useState<number | null>(null);
   const t = useTranslations("UserProfile.Wallet");

   useEffect(() => {
      async function getCurrencyRates() {
         try {
            if (user?.currency == "USD") {
               const response = await fetch(
                  "https://api.freecurrencyapi.com/v1/latest?currencies=USD&base_currency=IDR",
                  {
                     headers: {
                        apikey: process.env.NEXT_PUBLIC_FREE_CURRENCY_KEY as string,
                     },
                  },
               );
               const data = await response.json();
               if (data.data) {
                  setCurrencyRates(data.data.USD);
               } else {
                  setCurrencyRates(1);
               }
            } else {
               setCurrencyRates(1);
            }
         } catch (error) {
            console.error(error);
         } finally {
            setCurrencyLoading(false); // FINISH LOADING CURRENCY RATE
         }
      }

      async function fetchData() {
         await getCurrencyRates();
      }

      fetchData();
   }, [user]);

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button type="button" variant={"default"} size={"sm"} className="w-full">
               {t("trigger")}
            </Button>
         </DialogTrigger>
         <DialogContent className="w-[300px] sm:w-[375px]">
            <DialogHeader>
               <DialogTitle>{t("header")}</DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>
            {user?.customer && (
               <div className="flex items-center space-x-2">
                  {currencyRates !== null && (
                     <div className="flex items-center justify-center gap-4 sm:flex-col sm:items-start">
                        <div className="space-y-1">
                           <p className="text-muted-foreground text-sm">{t("balance")}</p>
                           <p className="text-sm font-medium leading-none">
                              {currencyRates == 1
                                 ? currency(user?.wallet.balance, "IDR", currencyRates)
                                 : currency(user?.wallet?.balance, user?.currency, currencyRates)}
                           </p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-muted-foreground text-sm">{t("points")}</p>
                           <p className="text-sm font-medium leading-none">
                              {currencyRates == 1
                                 ? currency(user?.wallet.points, "IDR", currencyRates)
                                 : currency(user?.wallet?.points, user?.currency, currencyRates)}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            )}
            <DialogFooter className="sm:justify-end">
               <DialogClose asChild>
                  <Button type="button" variant="secondary">
                     {t("close")}
                  </Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
