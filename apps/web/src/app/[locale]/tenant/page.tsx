"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tenant() {
   const [properties, setProperties] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const { user, setUser } = useUserStore();
   const searchParams = useSearchParams();
   const successMessage = searchParams.get("success");
   const router = useRouter();

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

   useEffect(() => {
      const fetchProperties = async () => {
         try {
            const res = await fetch(`http://localhost:8000/api/v1/property/`, {
               method: "GET",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            });
            const resData = await res.json();
            setProperties(resData.data); // Assuming response has data in `data` field
         } catch (error) {
            console.error(error);
         }
      };
      fetchProperties();
   }, []);
   console.log(Object.values(properties));

   return (
      <div className="p-4">
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {properties.map((property: any) => (
                  <div key={property.id}>
                     <Card>
                        <CardHeader>
                           <Image
                              src={property.propertyPictures?.[0]?.url}
                              height={200}
                              width={300}
                              alt={"property images"}
                              className="h-50 w-50"
                           />
                        </CardHeader>
                        <CardTitle>{property.name}</CardTitle>
                        <CardDescription>{property.description}</CardDescription>
                     </Card>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
