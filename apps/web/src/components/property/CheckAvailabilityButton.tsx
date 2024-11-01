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
import DatePickerForm from "@/components/book/DatePickerRange";

export default function CheckAvailabilityButton({
   roomId,
   propertyName,
   roomType,
   currencyRate,
}: {
   roomId: string;
   propertyName: string;
   roomType: string;
   currencyRate: number | null;
}) {
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
         <DialogContent className="h-[400px] w-[350px] sm:w-[375px]">
            <DialogHeader className="text-left">
               <DialogTitle>Select Booking Dates</DialogTitle>
               <DialogDescription className="flex flex-col gap-1">
                  <span>Property Name: {propertyName}</span>
                  <span>Room Type: {roomType}</span>
               </DialogDescription>
            </DialogHeader>
            <DatePickerForm roomId={roomId} currencyRate={currencyRate} />
         </DialogContent>
      </Dialog>
   );
}
