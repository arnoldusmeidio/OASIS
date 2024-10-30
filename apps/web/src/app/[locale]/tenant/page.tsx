"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import TenantSkeleton from "@/components/tenant/TenantSkeleton";
import TenantCard from "@/components/tenant/tenantCard";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Property } from "@/types/property-types";

import PaginationComponent from "@/components/tenant/Pagination-button";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";

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
   const [isDelete, setIsDelete] = useState(null);
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

   const handleDelete = async (id: string) => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/tenant/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
         });
         if (!response.ok) throw new Error("Failed to delete property");

         const data = await response.json();
         setIsDelete(data.data);

         setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
         fetchProperties();
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
                  <div key={property.id}>
                     <Link href={`/tenant/property-detail/${property.id}`}>
                        <TenantCard
                           img={property.propertyPictures?.[0]?.url}
                           propertyName={property.name}
                           propertyDescription={property.description}
                        />
                     </Link>
                     <div className="my-5 transform cursor-pointer gap-4 transition duration-300 ease-out hover:scale-105">
                        <AlertDialog>
                           <AlertDialogTrigger asChild>
                              <Button variant="outline">Delete your property</Button>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                              <AlertDialogHeader>
                                 <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                 <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove
                                    your data from our servers.
                                 </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                 <AlertDialogAction onClick={() => handleDelete(property.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                           </AlertDialogContent>
                        </AlertDialog>
                     </div>
                  </div>
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
