"use client";

import { useEffect, useState } from "react";

export default function Tenant() {
   const [property, setProperty] = useState({ data: [] });
   const properties = async () => {
      try {
         const res = await fetch(`http://localhost:8069/api/v1/property/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
         });

         const resData = await res.json();
         console.log(resData);
         setProperty(resData);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      properties();
   }, []);
   return (
      <>
         {properties.map((e) => {
            <div key={e.id}>
               <Image src={e.image} width={50} height={50} alt={logo.title} />
            </div>;
         })}
      </>
   );
}
