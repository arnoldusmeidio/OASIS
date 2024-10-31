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
import useCurrencyStore from "@/stores/useCurrencyStore";

export default function CheckAvailabilityButton() {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               type="button"
               variant={"default"}
               size={"sm"}
               className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-600"
            >
               Check Availability
            </Button>
         </DialogTrigger>
         <DialogContent className="w-[300px] sm:w-[375px]">
            <DialogHeader>
               <DialogTitle>Select Booking Dates</DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-end">
               <DialogClose asChild>
                  <Button type="button" variant="secondary">
                     Close
                  </Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
