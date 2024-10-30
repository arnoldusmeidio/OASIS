"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DeleteButton() {
   const [deleteProperty, setDeleteProperty] = useState();

   useEffect(() => {
      const del = async () => {
         try {
            const del = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/tenant`, {
               method: "DELETE",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            });
            const delData = await del.json();
            setDeleteProperty(delData.data);
         } catch (error) {
            console.error(error);
         }
      };
   }, []);

   return (
      <>
         <Button onClick={() => {}}></Button>
      </>
   );
}
