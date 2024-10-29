"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useParams, useRouter } from "next/navigation";
import { RoomStatus } from "@/types/room-status";
import { checkRoomBooking } from "@/helpers/check-room-booking";
import { checkRoomPrice } from "@/helpers/check-room-price";
import { Router } from "next/router";
import { includes } from "cypress/types/lodash";

export default function DatePickerForm({ className }: React.HTMLAttributes<HTMLDivElement>) {
   const [date, setDate] = useState<DateRange | undefined>({
      from: undefined,
      to: undefined,
   });

   const form = useForm();

   const params = useParams<any>();
   const roomId = params.slug; // get the room id from url

   const [roomStatus, setRoomStatus] = useState<RoomStatus>();
   const [numberOfMonths, setNumberOfMonths] = useState<number>(2);

   const router = useRouter();

   if (!roomId) {
      return <h1>No Room Id provided</h1>;
   }
   async function onSubmit() {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/bookings/${roomId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date }),
            credentials: "include",
         });

         if (!res.ok) {
            toast.error("Unable to book", { duration: 1500 });
         } else {
            toast.success("Booking Successfully Created", { duration: 1500 });
            router.push("/user/bookings");
         }
      } catch (error) {
         console.error(error);
      }
   }

   //custom
   useEffect(() => {
      function handleResize() {
         if (window.innerWidth < 650) {
            setNumberOfMonths(1);
         } else {
            setNumberOfMonths(2);
         }
      }

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   useEffect(() => {
      async function fetchPrices() {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/bookings/${roomId}/status`, {
            method: "GET",
            credentials: "include",
         });
         const data = await response.json();

         setRoomStatus(data.data);
      }

      fetchPrices();
   }, []);

   function handleSelect(selectedDate: DateRange | undefined) {
      if (selectedDate) {
         const { from, to } = selectedDate;

         if (from && to && from.getTime() === to.getTime()) {
            setDate(undefined);
            return;
         }

         if (from && to) {
            const selectedDatesArray: Date[] = [];
            let currentDate = from;

            while (currentDate <= to) {
               selectedDatesArray.push(currentDate);
               currentDate = addDays(currentDate, 1);
            }

            const isBooked = selectedDatesArray.some((date) => checkRoomBooking(date, roomStatus));

            if (isBooked) {
               setDate({ from: to, to: undefined });
               return;
            }
         }

         setDate(selectedDate);
      } else {
         setDate(undefined);
      }
   }

   return (
      <div className={cn("grid gap-2", className)}>
         <Popover>
            <PopoverTrigger asChild>
               <Button
                  id="date"
                  variant={"outline"}
                  className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
               >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                     date.to ? (
                        <>
                           {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                     ) : (
                        format(date.from, "LLL dd, y")
                     )
                  ) : (
                     <span>Pick a date</span>
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleSelect}
                  numberOfMonths={numberOfMonths}
                  components={{
                     DayContent: ({ date }) => {
                        return (
                           <div className="flex flex-col items-center justify-center">
                              <span>{date.getDate()}</span>
                              <span className="text-[10px] text-green-500">{checkRoomPrice(date, roomStatus)}</span>
                           </div>
                        );
                     },
                  }}
                  disabled={(date) => checkRoomBooking(date, roomStatus)}
               />
            </PopoverContent>
         </Popover>
         <Button onClick={onSubmit}>Submit</Button>
      </div>
   );
}
