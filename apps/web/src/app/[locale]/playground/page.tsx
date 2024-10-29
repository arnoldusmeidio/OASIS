"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
   const [propertyData, setPropertyData] = useState({ data: [] });
   const eventGetter = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/playgrounds`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
         });

         const resData = await res.json();
         setPropertyData(resData);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      eventGetter();
   }, []);

   //console.log(propertyData);
   return (
      <main>
         {(propertyData as any)?.data?.map((e: any) => (
            <div key={e.id}>
               <h1 className="text-3xl font-bold">{e.name}</h1>
               {e.room?.map((e: any, idx: number) => (
                  <Link href={`/playground/${e.id}`} key={e.id}>
                     <h2 className="text-2xl">{e.type}</h2>
                  </Link>
               ))}
            </div>
         ))}
      </main>
   );
}
