"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Booking } from "@/types/booking";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function BookingCard() {
   const [bookingData, setBookingData] = useState({ data: [] });
   const eventGetter = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/bookings`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
         });

         const resData = await res.json();
         setBookingData(resData);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      eventGetter();
   }, []);

   if (bookingData.data.length == 0) {
      return (
         <div className="flex flex-col gap-4 px-4 py-4">
            <div className="flex justify-center gap-2 align-middle">
               <Image
                  alt="picture of people going on holiday"
                  width={100}
                  height={100}
                  src={"/drive.svg"}
                  className="w-[40%] max-w-[40%]"
               />
            </div>
            <h3 className="flex justify-center gap-2 align-middle">No booking found!</h3>
            <div className="flex justify-center gap-2 align-middle">
               <Button className="w-[30%] max-w-[30%]">Book Now</Button>
            </div>
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-4 px-4 py-4">
         <Accordion type="single" collapsible>
            {(bookingData as any)?.data?.map((e: Booking, index: number) => (
               <AccordionItem value={e.id} key={e.id}>
                  <AccordionTrigger>
                     Booking Number: <h6 className="font-bold">{e.bookingNumber}</h6>
                  </AccordionTrigger>
                  <AccordionContent>
                     <Card className="w-full shadow-md">
                        <CardHeader>
                           <CardTitle>Booking Info</CardTitle>
                           <CardDescription>
                              {!e.endDate
                                 ? `${format(e.startDate, "LLL dd, y")}`
                                 : `${format(e.startDate, "LLL dd, y")} - ${format(e.endDate, "LLL dd, y")}`}
                              <Image
                                 src={e.room.pictureUrl}
                                 alt=""
                                 width={200}
                                 height={200}
                                 className="flex rounded-lg"
                              ></Image>
                           </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                           <div className="flex items-center space-x-4 rounded-md border p-4">
                              <div className="flex-1 space-y-1">
                                 <p className="text-sm font-medium leading-none">Payment Status:</p>
                                 <p className="text-muted-foreground text-sm">{e.paymentStatus}</p>
                              </div>
                           </div>
                        </CardContent>
                        <CardFooter className="flex gap-4">
                           {e.paymentStatus == "PENDING" ? (
                              <Link href="/">
                                 <Button className="w-full">Pay Now</Button>
                              </Link>
                           ) : (
                              ""
                           )}
                           {e.paymentStatus == "PENDING" ? (
                              <Link href="/">
                                 <Button className="w-full">Cancel Booking</Button>
                              </Link>
                           ) : (
                              ""
                           )}
                        </CardFooter>
                     </Card>
                  </AccordionContent>
               </AccordionItem>
            ))}
         </Accordion>
      </div>
   );
}
