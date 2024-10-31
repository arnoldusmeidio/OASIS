"use client";

import FormError from "@/components/FormError";
import SearchNavbar from "@/components/header/SearchNavbar";
import PropertyPicturesCarousel from "@/components/property/PropertyPicturesCarousel";
import SearchSkeleton from "@/components/SearchSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Property } from "@/types/property-types";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { slug: string } }) {
   const [property, setProperty] = useState<Property>();
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const getProperty = async () => {
         try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/property/${params.slug}`, {
               credentials: "include",
            });
            const data = await response.json();
            if (!data.ok) {
               setError(data.message);
            } else {
               setProperty(data.data);
            }
         } catch (error) {
            console.error(error);
         }
      };
      getProperty();
      setIsLoading(false);
   }, []);

   if (!isLoading && !property) {
      return (
         <>
            <SearchNavbar />
            <div className="">
               <div className="max-w-[500px] justify-self-center">
                  <FormError message={error} />
               </div>
            </div>
         </>
      );
   }

   return (
      <>
         <SearchNavbar />
         {isLoading || !property ? (
            <SearchSkeleton />
         ) : (
            <div className="mx-auto max-w-7xl p-6 lg:px-8">
               <PropertyPicturesCarousel property={property} />
               <h2 className="text-lg font-bold">{property?.name}</h2>
               <h3>{property?.address}</h3>
               <div>
                  <span className="block">Hotel Description:</span>
                  <p>{property?.description}</p>
               </div>
               <div>
                  {property?.room.map((item, idx: number) => (
                     <div key={item.id}>
                        <AspectRatio ratio={1 / 1}>
                           {/* <Image
                                    className="rounded-lg object-cover"
                                    src={item.}
                                    alt="image of property"
                                    loading="lazy"
                                    fill
                                    sizes="max-width: 256px"
                                 /> */}
                        </AspectRatio>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   );
}
