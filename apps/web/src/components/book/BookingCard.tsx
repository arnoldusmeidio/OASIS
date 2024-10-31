"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";
import { Booking } from "@/types/booking";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { Skeleton } from "../ui/skeleton";

interface SnapWindow extends Window {
   snap?: { embed: (token: string, options: { embedId: string }) => void };
}

export default function BookingCard() {
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(true);
   const [bookingData, setBookingData] = useState({ data: [] });
   // const [dataReplica, setDataReplica] = useState({ data: [] });

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

   const eventGetter = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/bookings`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
         });

         const resData = await res.json();
         if (resData.ok) {
            setBookingData(resData);
            // setDataReplica(resData);
         }
         setIsLoading(false);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      eventGetter();
   }, []);

   if (isLoading) return <Skeleton className="flex flex-col gap-4 px-4 py-4" />;

   if (bookingData.data.length == 0) {
      return (
         <div className="flex flex-col gap-4 px-4 py-4">
            <div className="flex justify-center gap-2 align-middle">
               <Image
                  alt="picture of people going on holiday"
                  width={100}
                  height={100}
                  src={"/drive.svg"}
                  className="h-[300px] w-[300px] md:h-[500px] md:w-[500px]"
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
      <>
         <div className="flex justify-end gap-4 px-4 py-4">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort</Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup>
                     <DropdownMenuRadioItem value="date_asc">Date (Asc)</DropdownMenuRadioItem>
                     <DropdownMenuRadioItem value="date_desc">Date (Desc)</DropdownMenuRadioItem>
                     <DropdownMenuRadioItem value="booking_asc">Booking Number (Asc)</DropdownMenuRadioItem>
                     <DropdownMenuRadioItem value="booking_desc">Booking Number (Desc)</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <Accordion type="single" collapsible>
            {(bookingData as any)?.data?.map((e: Booking, index: number) => (
               <AccordionItem value={e.id} key={e.id}>
                  <AccordionTrigger>
                     <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div>Booking Number:</div>
                        <div>
                           <h6 className="font-bold"> {e.bookingNumber}</h6>
                        </div>
                     </div>
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
                                 <Button
                                    className="w-full"
                                    onClick={async (ev: React.MouseEvent<HTMLButtonElement>) => {
                                       ev.preventDefault();
                                       try {
                                          const response = await fetch(
                                             `http://localhost:8000/api/v1/payments/${e.bookingNumber}`,
                                             {
                                                method: "POST",
                                                headers: {
                                                   "Content-Type": "application/json",
                                                },
                                                credentials: "include",
                                                //body: JSON.stringify({ itemId, quantity }),
                                             },
                                          );
                                          const data = await response.json();

                                          // (window as SnapWindow).snap!.embed(data.data.transaction.token, {
                                          //    embedId: "snap-container",
                                          // });

                                          router.push(data.data.transaction.redirect_url);
                                       } catch (error) {
                                          console.error(error);
                                       }
                                    }}
                                 >
                                    Pay Now
                                 </Button>
                              </Link>
                           ) : (
                              ""
                           )}
                           {e.paymentStatus == "PENDING" ? (
                              <AlertDialog>
                                 <AlertDialogTrigger asChild>
                                    <Button variant="outline">Cancel Booking</Button>
                                 </AlertDialogTrigger>
                                 <AlertDialogContent>
                                    <AlertDialogHeader>
                                       <AlertDialogTitle>Cancel your booking?</AlertDialogTitle>
                                       <AlertDialogDescription>
                                          By confirming cancellation, all associated reservations will be released.
                                          Please review our policies regarding cancellations carefully.
                                       </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                                       <AlertDialogAction
                                          onClick={async () => {
                                             try {
                                                const res = await fetch(
                                                   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/bookings/${e.bookingNumber}`,
                                                   {
                                                      method: "DELETE",
                                                      headers: { "Content-Type": "application/json" },
                                                      credentials: "include",
                                                   },
                                                );
                                                toast("Booking Successfully Cancelled", { duration: 1500 });
                                                eventGetter();
                                             } catch (error) {
                                                console.error(error);
                                             }
                                          }}
                                       >
                                          Continue
                                       </AlertDialogAction>
                                    </AlertDialogFooter>
                                 </AlertDialogContent>
                              </AlertDialog>
                           ) : (
                              ""
                           )}
                        </CardFooter>
                     </Card>
                  </AccordionContent>
               </AccordionItem>
            ))}
         </Accordion>
      </>
   );
}
