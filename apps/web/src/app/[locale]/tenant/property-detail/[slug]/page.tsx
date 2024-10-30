"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Property } from "@/types/property-types";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
         } finally {
            setIsLoading(false);
         }
      };
      propertyGetter();
   }, [params.slug]);

   return (
      <>
         {isLoading ? (
            <p>Loading...</p>
         ) : getProperty ? (
            <div className="mx-auto w-3/5">
               {getProperty.propertyPictures?.length === 1 ? (
                  // Single Card Display
                  <Card className="w-full overflow-hidden rounded-lg shadow-lg">
                     <Image
                        src={getProperty.propertyPictures[0].url || "/placeholder.jpg"}
                        alt="Property picture"
                        width={600}
                        height={400}
                        className="h-60 w-full object-cover"
                     />
                     <CardContent>
                        <h2 className="text-lg font-semibold">{getProperty.name}</h2>
                        <p className="text-sm text-gray-600">{getProperty.description}</p>
                        <div className="mt-2 w-fit rounded-xl border-2 border-black px-2 py-1">
                           <p className="text-xs font-medium">{getProperty.category}</p>
                        </div>
                     </CardContent>
                  </Card>
               ) : (
                  // Carousel Display for Multiple Images
                  <Carousel className="w-full rounded-lg shadow-lg">
                     <CarouselContent>
                        {getProperty.propertyPictures.map((picture, index) => (
                           <CarouselItem key={index}>
                              <Image
                                 src={picture.url || "/placeholder.jpg"}
                                 alt={`Property picture ${index + 1}`}
                                 width={600}
                                 height={400}
                                 className="h-60 w-full rounded-lg object-cover"
                              />
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                     <CarouselPrevious />
                     <CarouselNext />
                     <div className="p-4">
                        <h2 className="text-lg font-semibold">{getProperty.name}</h2>
                        <p className="text-sm text-gray-600">{getProperty.description}</p>
                        <div className="mt-2 w-fit rounded-xl border-2 border-black px-2 py-1">
                           <p className="text-xs font-medium">{getProperty.category}</p>
                        </div>
                     </div>
                  </Carousel>
               )}
            </div>
         ) : (
            <p>No property details available.</p>
         )}
      </>
   );
}
