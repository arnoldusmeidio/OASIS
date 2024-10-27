"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
   return <></>;
}
