"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useParams } from "next/navigation";

export default function DatePickerForm({ className }: React.HTMLAttributes<HTMLDivElement>) {
   const [date, setDate] = useState<DateRange | undefined>();

   const form = useForm();

   const params = useParams<any>();
   const roomId = params.slug; // get the room id from url
   if (!roomId) {
      return <h1>No Room Id provided</h1>;
   }
   async function onSubmit() {
      //console.log(date);
      console.log(JSON.stringify({ date }));
      try {
         const res = await fetch(`http://localhost:8000/api/v1/bookings/${roomId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date }),
            credentials: "include",
         });

         console.log(res);
         toast.success("Booking Successfully Created", { duration: 1500 });
      } catch (error) {
         console.error(error);
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
                  onSelect={setDate}
                  numberOfMonths={2}
               />
            </PopoverContent>
         </Popover>
         <Button onClick={onSubmit}>Submit</Button>
      </div>
   );
}
