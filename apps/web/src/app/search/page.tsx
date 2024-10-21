"use client";

import SearchNavbar from "@/components/header/SearchNavbar";
import SearchSkeleton from "@/components/SearchSkeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bannerData } from "@/static-db";

type Props = {
   searchParams: SearchParams;
};

type SearchParams = {
   location: string;
   group_adults: string;
   group_children: string;
   no_rooms: string;
   checkin: string;
   checkout: string;
};

export default function SearchPage({ searchParams }: Props) {
   const [properties, setProperties] = useState([]) as any;
   const [isLoading, setIsLoading] = useState(true);

   const rupiah = (number: number) => {
      return new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
      }).format(number);
   };

   useEffect(() => {
      async function getProperties() {
         try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/properties/search`, {
               method: "POST",
               body: JSON.stringify(searchParams),
            });
            const data = await response.json();
            if (data.ok) {
               setProperties(data.data);
            } else {
               setProperties(bannerData); //need to be changed with real data
               setIsLoading(false);
            }
         } catch (error) {
            console.error(error);
         }
      }
      getProperties();
   }, []);

   return (
      <>
         <SearchNavbar />
         {isLoading ? (
            <SearchSkeleton />
         ) : (
            <main>
               <div className="mx-auto max-w-7xl p-6 lg:px-8">
                  <h2 className="pb-3 text-3xl font-bold">Your Search Results</h2>

                  <h3 className="pb-3">
                     Dates of trips
                     <span className="ml-2 italic">
                        {searchParams.checkin} to {searchParams.checkout}
                     </span>
                  </h3>

                  <hr className="mb-5" />

                  <h3 className="text-xl font-semibold">
                     {searchParams.location}: {properties.length} properties found
                  </h3>

                  <div className="mt-5 space-y-2">
                     {properties.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between space-x-4 space-y-2 rounded-lg border p-5">
                           <div className="h-auto w-64 max-sm:basis-1/2">
                              <Link href={"/"}>
                                 <AspectRatio ratio={1 / 1}>
                                    <Image
                                       className="rounded-lg object-cover"
                                       src={item.img}
                                       alt="image of property"
                                       loading="lazy"
                                       fill
                                       sizes="max-width: 256px"
                                    />
                                 </AspectRatio>
                              </Link>
                           </div>

                           <div className="flex flex-1 flex-col justify-around gap-2 max-sm:basis-1/2 sm:flex-row sm:justify-between sm:space-x-5">
                              <div>
                                 <Link
                                    href={"/"}
                                    className="text-base font-bold text-[#1a61ef] hover:underline md:text-xl lg:text-2xl"
                                 >
                                    {item.propertyName}
                                 </Link>
                                 <p className="hidden text-xs sm:flex lg:text-base">{item.description}</p>
                              </div>

                              <div className="flex flex-col justify-between gap-2">
                                 <div className="flex items-center gap-2 sm:items-start sm:justify-end sm:space-x-2 sm:text-right">
                                    <div className="items-start gap-2 max-sm:order-2 max-sm:items-center sm:flex sm:flex-col sm:items-end">
                                       <p className="text-xs sm:font-bold md:text-sm lg:text-base">{item.ratingWord}</p>
                                       <p className="text-xs sm:flex md:text-sm lg:text-base">
                                          {item.reviewsCount && `${item.reviewsCount} reviews`}
                                       </p>
                                    </div>

                                    <p className="text-background flex-shink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a61ef] text-sm font-bold max-sm:order-1 lg:h-12 lg:w-12 lg:text-lg">
                                       {item.rating ? item.rating.toFixed(1) : "N/A"}
                                    </p>
                                 </div>

                                 <div className="sm:text-right">
                                    <p className="text-xs md:text-sm lg:text-base">capacity: {item.capacity} persons</p>
                                    <p className="text-lg font-bold md:text-xl lg:text-2xl">{rupiah(item.price)}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </main>
         )}
      </>
   );
}
