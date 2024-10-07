"use client";

import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/user-card/UserCard";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
   const [isLoading, setIsLoading] = useState(true);
   const { user, setUser } = useUserStore();

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
      <main className="flex h-full items-center justify-center overflow-y-auto bg-[#85d8ea] px-4">
         <div className="h-full w-[375px] content-center self-center">
            <div className="h-fit w-full py-4">
               <div>This is Home Page</div>
               {isLoading ? (
                  <Skeleton className="h-[50px] w-[100px] rounded-lg" />
               ) : (
                  <div>
                     {user !== null ? (
                        <div className="flex flex-col gap-2">
                           <UserCard />
                           <LogoutButton>
                              <Button variant={"secondary"} size={"lg"}>
                                 Log out
                              </Button>
                           </LogoutButton>
                        </div>
                     ) : (
                        <LoginButton>
                           <Button variant={"secondary"} size={"lg"}>
                              Log in
                           </Button>
                        </LoginButton>
                     )}
                  </div>
               )}
            </div>
         </div>
      </main>
   );
}
