import { addDays, format } from "date-fns";
import { SetStateAction, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { checkRoomBooking } from "@/helpers/check-room-booking";
import { RoomStatus } from "@/types/room-status";
import { checkRoomPrice } from "@/helpers/check-room-price";

interface TenantDatePickerProps {
   roomId: string;
   roomStatus: RoomStatus | undefined;
   setTanggal: React.Dispatch<SetStateAction<{ date: Date; price: number }[]>>;
}

interface SpecialDate {
   range: DateRange;
   price: number;
}

export default function TenantDatePicker({ roomId, roomStatus, setTanggal }: TenantDatePickerProps) {
   const [date, setDate] = useState<DateRange | undefined>(undefined);
   const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);
   const [customPrice, setCustomPrice] = useState<number | undefined>(undefined);
   const [numberOfMonths, setNumberOfMonths] = useState<number>(2);
   const [tenantRoomStatus, setTenantRoomStatus] = useState<RoomStatus>();

   // Handle date selection
   const handleSelect = (selectedDate: DateRange | undefined) => {
      setDate(selectedDate);
   };

   useEffect(() => {
      async function fetchPrices() {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/room/${roomId}/status`, {
            method: "GET",
            credentials: "include",
         });
         const data = await response.json();

         setTenantRoomStatus(data.data);
      }

      fetchPrices();
   }, []);

   // Add special date with custom price
   const handleAddSpecialDate = () => {
      if (date && customPrice) {
         const newSpecialDate = { range: date, price: customPrice };
         const timeDate = (prev: any) => [...prev, newSpecialDate];
         setSpecialDates(timeDate);
         setDate(undefined);
         setCustomPrice(undefined);
         toast.success("Special date added");
         setTanggal(timeDate);
      }
   };

   // Remove special date
   const handleRemoveSpecialDate = (index: number) => {
      const setTimes = specialDates.filter((_, i) => i !== index);
      setSpecialDates(setTimes);
      setTanggal(setTimes as any);
   };

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

   return (
      <div className="grid gap-2">
         <Popover>
            <PopoverTrigger asChild>
               <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                  {date?.from ? (
                     date.to ? (
                        <>
                           {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                     ) : (
                        format(date.from, "LLL dd, y")
                     )
                  ) : (
                     <span>Pick special dates</span>
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                  mode="range"
                  selected={date}
                  onSelect={handleSelect}
                  numberOfMonths={numberOfMonths}
                  components={{
                     DayContent: ({ date }) => (
                        <div className="flex flex-col items-center justify-center">
                           <span>{date.getDate()}</span>
                           <span className="text-[10px] text-green-500">{checkRoomPrice(date, tenantRoomStatus)}</span>
                        </div>
                     ),
                  }}
                  disabled={(date) => checkRoomBooking(date, tenantRoomStatus)}
               />
            </PopoverContent>
         </Popover>

         <Input
            type="number"
            placeholder="Custom price"
            value={customPrice !== undefined ? customPrice : ""}
            onChange={(e) => setCustomPrice(parseInt(e.target.value))}
         />

         <Button onClick={handleAddSpecialDate} type="button">
            Add Special Date
         </Button>

         {/* Display added special dates */}
         <div>
            {specialDates.map((item, index) => (
               <div key={index} className="flex items-center justify-between">
                  <span>
                     {format(item.range.from!, "LLL dd, y")} - {format(item.range.to!, "LLL dd, y")} : ${item.price}
                  </span>
                  <Button variant="destructive" type="button" onClick={() => handleRemoveSpecialDate(index)}>
                     Remove
                  </Button>
               </div>
            ))}
         </div>
      </div>
   );
}
