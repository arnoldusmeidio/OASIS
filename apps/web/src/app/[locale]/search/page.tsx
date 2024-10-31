"use client";

import SearchNavbar from "@/components/header/SearchNavbar";
import SearchSkeleton from "@/components/SearchSkeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { currency } from "@/lib/currency";
import { useUserStore } from "@/stores/useUserStore";
import { Property } from "@/types/property-types";
import { toast } from "sonner";
import FormError from "@/components/FormError";
import useCurrencyStore from "@/stores/useCurrencyStore";
import PaginationComponent from "@/components/tenant/Pagination-button";

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

interface Paginations {
   currentPage: number;
   totalPages: number;
   totalProperties: number;
}

export default function SearchPage({ searchParams }: Props) {
   const [properties, setProperties] = useState<Property[]>([]);
   const [totalPropertiesFound, setTotalPropertiesFound] = useState(0);
   const [isLoading, setIsLoading] = useState(true);
   const [currencyLoading, setCurrencyLoading] = useState(true);
   const { user } = useUserStore();
   const [page, setPage] = useState<Paginations>();
   const { currencyRate, error, getCurrencyRate } = useCurrencyStore();
   const totalPerson = Number(searchParams.group_adults) + Number(searchParams.group_children);

   function getRatingDescription(rating: number) {
      if (rating < 1 || rating > 10) {
         return "Invalid rating";
      }
      if (rating >= 1 && rating <= 2) {
         return "Very Bad";
      } else if (rating >= 3 && rating <= 4) {
         return "Poor";
      } else if (rating > 4 && rating <= 6) {
         return "Average";
      } else if (rating > 6 && rating <= 8) {
         return "Good";
      } else if (rating > 8 && rating <= 9) {
         return "Excellent";
      } else if (rating > 9 && rating <= 10) {
         return "Exceptional";
      }
   }

   async function getProperties(pages = 1) {
      try {
         setIsLoading(true);
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/property/search?page=${pages}&location=${searchParams.location}&totalperson=${totalPerson}&checkin=${searchParams.checkin}&checkout=${searchParams.checkout}&roomsrequired=${searchParams.no_rooms}`,
            {
               credentials: "include",
            },
         );
         const data = await response.json();
         if (data.ok) {
            setProperties(data.data);
            setPage(data.meta);
            setTotalPropertiesFound(data.meta.totalProperties);
            setIsLoading(false);
         }
      } catch (error) {
         console.error(error);
         toast.error("Something went wrong!");
      }
   }

   useEffect(() => {
      getProperties();
      if (user?.currency && user.currency != "IDR") {
         setCurrencyLoading(true);
         getCurrencyRate();
         setCurrencyLoading(false);
      } else {
         setCurrencyLoading(false);
      }
   }, [user?.currency, getCurrencyRate, searchParams]);

   if (error)
      return (
         <>
            <SearchNavbar />
            <main>
               <div className="max-w-[500px] justify-self-center">
                  <FormError message={error} />
               </div>
            </main>
         </>
      );

   return (
      <>
         <SearchNavbar />
         {isLoading || currencyLoading ? (
            <SearchSkeleton />
         ) : (
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
                  {searchParams.location}: {totalPropertiesFound} properties found
               </h3>
               <div className="search-result mt-5 space-y-2">
                  {properties.map((item, idx: number) => (
                     <div key={idx} className="flex justify-between space-x-4 space-y-2 rounded-lg border p-5">
                        <div className="h-auto w-64 content-center max-sm:basis-1/2">
                           <Link href={`/search/property/${item.id}`}>
                              <AspectRatio ratio={1 / 1}>
                                 <Image
                                    className="rounded-lg object-cover"
                                    src={item.propertyPictures?.[0]?.url}
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
                                 href={`/search/property/${item.id}`}
                                 className="text-base font-bold text-[#1a61ef] hover:underline md:text-xl lg:text-2xl"
                              >
                                 {item.name}
                              </Link>
                              <p className="hidden text-xs sm:flex lg:text-base">{item.description}</p>
                           </div>

                           <div className="flex flex-col justify-between gap-2">
                              <div className="flex items-center gap-2 sm:items-start sm:justify-end sm:space-x-2 sm:text-right">
                                 <div className="items-start gap-2 max-sm:order-2 max-sm:items-center sm:flex sm:flex-col sm:items-end">
                                    <p className="text-xs sm:font-bold md:text-sm lg:text-base">
                                       {item.reviews.length > 0
                                          ? getRatingDescription(
                                               item.reviews.reduce((acc: number, review) => {
                                                  return acc + review.star;
                                               }, 0) / item.reviews.length,
                                            )
                                          : null}
                                    </p>
                                    <p className="text-xs sm:flex md:text-sm lg:text-base">
                                       {item.reviews.length > 0 && `${item.reviews.length} reviews`}
                                    </p>
                                 </div>
                                 <p className="text-background flex-shink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a61ef] text-sm font-bold max-sm:order-1 lg:h-12 lg:w-12 lg:text-lg">
                                    {item.reviews.length > 0
                                       ? (
                                            item.reviews.reduce((acc: number, review) => {
                                               return acc + review.star;
                                            }, 0) / item.reviews.length
                                         ).toFixed(1)
                                       : "N/A"}
                                 </p>
                              </div>

                              <div className="flex flex-col gap-2 sm:text-right">
                                 <p className="text-xs md:text-sm lg:text-base">
                                    capacity: {item.room?.[0]?.roomCapacity} persons
                                 </p>
                                 <div>
                                    <p className="text-xs md:text-sm lg:text-base">Price per night:</p>
                                    <p className="font-bold md:text-xl lg:text-2xl">
                                       {!currencyRate
                                          ? currency(item.room?.[0]?.roomPrice[0]?.price, "IDR", 1)
                                          : currency(item.room?.[0]?.roomPrice[0]?.price, user?.currency, currencyRate)}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
                  {page && (
                     <div className="my-10">
                        <PaginationComponent
                           currentPage={page.currentPage}
                           totalPages={page.totalPages}
                           onPageChange={(newPage) => {
                              getProperties(newPage);
                              window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top smoothly
                           }}
                        />
                     </div>
                  )}
               </div>
            </div>
         )}
      </>
   );
}
