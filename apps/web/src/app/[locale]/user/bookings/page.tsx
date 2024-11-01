import BookingCard from "@/components/book/BookingCard";
import Navbar from "@/components/Navbar";

import React from "react";

export default function BookingPage() {
   return (
      <>
         <div className="flex w-full min-w-[340px] max-w-7xl flex-col gap-8 px-8 py-4">
            <BookingCard />
         </div>
      </>
   );
}
