"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Property } from "@/types/property-types";

export default function PropertyDetails({ params }: { params: { slug: string } }) {
   const [getProperty, setGetProperty] = useState<Property>();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const propertyGetter = async () => {
         try {
            const get = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/property/${params.slug}`, {
               method: "GET",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            });

            const getData = await get.json();
            setGetProperty(getData.data);
         } catch (error) {
            console.error(error);
         }
      };
      propertyGetter();
      setIsLoading(false);
   }, []);

   return (
      <>
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            getProperty && (
               <div key={getProperty.id}>
                  <Image
                     src={getProperty.propertyPictures?.[0]?.url || "/placeholder.jpg"}
                     alt="Property picture"
                     width={300}
                     height={300}
                     className="rounded-lg"
                  />
                  <div>
                     <p>{getProperty.name}</p>
                     <p>{getProperty.description}</p>
                     <div className="w-fit rounded-xl border-2 border-black">
                        <p>{getProperty.category}</p>
                     </div>
                  </div>
               </div>
            )
         )}
      </>
   );
}
