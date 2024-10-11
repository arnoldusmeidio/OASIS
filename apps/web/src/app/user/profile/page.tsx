"use client";

import ChangeEmailForm from "@/components/auth/ChangeEmailForm";
import { Skeleton } from "@/components/ui/skeleton";
import UserCard from "@/components/user/UserCard";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
   const [isLoading, setIsLoading] = useState(true);
   const { setUser } = useUserStore();

   const router = useRouter();

   useEffect(() => {
      async function getUser() {
         try {
            const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/users/search`, {
               credentials: "include",
            });
            const data = await user.json();
            if (data.ok) {
               setUser(data.data);
               if (!data.data.tenant && !data.data.customer) {
                  router.push("/select-role");
                  router.refresh();
               }
            }
            setIsLoading(false);
         } catch (error) {
            console.error(error);
         }
      }
      getUser();
   }, []);

   return (
      <main className="flex h-full items-center justify-center overflow-y-auto px-4">
         <div className="h-full w-[375px] content-center self-center">
            <div className="flex h-fit w-full flex-col gap-4 py-4">
               <ChangeEmailForm />
               {isLoading ? <Skeleton className="h-[50px] w-[375px] rounded-lg" /> : <UserCard />}
            </div>
         </div>
      </main>
   );
}
