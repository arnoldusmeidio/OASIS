"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import TenantSkeleton from "@/components/tenant/TenantSkeleton";
import TenantCard from "@/components/tenant/tenantCard";

import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { Property } from "@/types/property-types";

import Link from "next/link";
import PaginationComponent from "@/components/tenant/Pagination-button";

interface Paginations {
   currentPage: number;
   totalPages: number;
   totalProperties: number;
}

export default function Tenant() {
   const [properties, setProperties] = useState<Property[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const { user, setUser } = useUserStore();
   const searchParams = useSearchParams();
   const successMessage = searchParams.get("success");
   const router = useRouter();
   const [page, setPage] = useState<Paginations>();

   useEffect(() => {
      async function getUser() {
         try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/users`, {
               credentials: "include",
            });
            const data = await res.json();
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

   const fetchProperties = async (pages = 1) => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/tenant?page=${pages}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
         });
         const resData = await res.json();
         setProperties(resData.data); // Assuming response has data in `data` field
         setPage(resData.meta);
         console.log(resData);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchProperties();
   }, []);

   return (
      <div className="p-4">
         {isLoading ? (
            <TenantSkeleton />
         ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {properties.map((property) => (
                  <Link href={`/tenant/property-detail/${property.id}`} key={property.id}>
                     <TenantCard
                        img={property.propertyPictures?.[0]?.url}
                        propertyName={property.name}
                        propertyDescription={property.description}
                     />
                  </Link>
               ))}
            </div>
         )}
         {page && (
            <div className="my-10">
               <PaginationComponent
                  currentPage={page.currentPage}
                  totalPages={page.totalPages}
                  onPageChange={(newPage) => {
                     fetchProperties(newPage);
                  }}
               />
            </div>
         )}
         <></>
      </div>
   );
}
