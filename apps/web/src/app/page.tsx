"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SearchNavbar from "@/components/header/SearchNavbar";
import Banner from "@/components/Banner";
import SmallCard from "@/components/SmallCard";
import { exploreData, bannerData } from "@/static-db";
import MediumCard from "@/components/MediumCard";
import Footer from "@/components/Footer";
import { divide } from "cypress/types/lodash";
import HomeSkeleton from "@/components/HomeSkeleton";

export default function Home() {
   const [isLoading, setIsLoading] = useState(true);
   const { user, setUser } = useUserStore();
   const searchParams = useSearchParams();
   const successMessage = searchParams.get("success");

   const router = useRouter();

   useEffect(() => {
      async function getUser() {
         try {
            const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/users`, {
               credentials: "include",
            });
            const data = await user.json();
            if (data.ok) {
               setUser(data.data);
               if (!data.data.tenant && !data.data.customer) {
                  router.push("/select-role");
                  router.refresh();
               }
               if (successMessage) {
                  toast.success(successMessage, { duration: 1500 });
               }
            }
         } catch (error) {
            console.error(error);
         }
      }
      getUser();
      setIsLoading(false);
   }, []);

   return (
      <>
         <SearchNavbar />
         <main className="bg-background mt-4 flex h-full min-h-screen flex-col items-center justify-center px-4">
            {isLoading ? (
               <HomeSkeleton />
            ) : (
               <>
                  <Banner />
                  <div className="mx auto mt-2 w-full max-w-7xl px-8 sm:px-16">
                     <section className="w-full justify-start pt-6">
                        <h2 className="pb-5 text-3xl font-semibold sm:text-4xl">Explore Indonesia</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
                           {exploreData?.map((item, idx) => (
                              <SmallCard key={idx} img={item.img} location={item.location} />
                           ))}
                        </div>
                     </section>

                     <section className="mt-4">
                        <h2 className="py-8 pb-5 text-3xl font-semibold sm:text-4xl">Popular Properties</h2>

                        <div className="mb-4 grid grid-cols-1 items-center gap-8 align-middle sm:grid-cols-2 lg:grid-cols-3">
                           {bannerData?.map((item) => (
                              <MediumCard
                                 key={item.id}
                                 img={item.img}
                                 propertyName={item.propertyName}
                                 location={item.location}
                              />
                           ))}
                        </div>
                     </section>
                  </div>
               </>
            )}
         </main>

         <Footer />
      </>
   );
}
