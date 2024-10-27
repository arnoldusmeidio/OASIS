import BookingCard from "@/components/book/BookingCard";
import Navbar from "@/components/Navbar";

import React from "react";

export default function BookingPage() {
   return (
      <>
         <main className="flex h-full items-center justify-center px-4">
            <div className="flex w-full min-w-[375px] max-w-7xl flex-col gap-8 px-8 py-4">
               <BookingCard />
            </div>
         </main>
      </>
   );
}
