"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TenantLogo from "./Tenant-logo";
import { Button } from "@/components/ui/button";
import RegisterButton from "../auth/RegisterButton";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

export default function TenantNavbar() {
   const { user } = useUserStore();
   return (
      <header className="bg-main-theme w-full">
         <nav className="mx-auto mb-14 flex max-w-[100rem] flex-col gap-4 p-3 shadow-sm sm:p-6">
            <div className="flex justify-between">
               {/* Left */}
               <div className="flex sm:basis-1/3">
                  <TenantLogo />
               </div>

               {/* Middle tagline */}
               <div className="text-background hidden self-center font-bold sm:basis-1/3 md:flex md:justify-center">
                  <span className="font-rokkitt text-xl tracking-wide xl:text-2xl 2xl:text-3xl">
                     Discover Hidden Havens
                  </span>
               </div>

               {/* Right */}
               {/* Desktop menu */}
               <div className="flex items-center justify-end align-middle sm:basis-1/3">
                  {/* Burger menu */}
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button variant="outline" className="flex justify-between gap-4 rounded-full py-7 pl-4 pr-2">
                           <Menu className="text-foreground h-6 w-6" />
                           <Avatar>
                              <AvatarImage src={user?.pictureUrl} alt="Profile picture" />
                              <AvatarFallback>
                                 <User />
                              </AvatarFallback>
                           </Avatar>
                        </Button>
                     </PopoverTrigger>

                     <PopoverContent className="mr-10 grid w-36 divide-y px-0 py-0">
                        {/* Conditinially render the button list */}
                        {user ? (
                           <>
                              <div>
                                 <Button variant={"ghost"} className="w-full justify-start" asChild>
                                    <Link href={"/user/profile"}>Profile</Link>
                                 </Button>
                                 <Button variant={"ghost"} className="w-full justify-start" asChild>
                                    <Link href={"/tenant/create-property"}>Create Property</Link>
                                 </Button>
                                 <Button variant={"ghost"} className="w-full justify-start" asChild>
                                    <Link href={"/tenant"}>Home</Link>
                                 </Button>
                              </div>
                              <div>
                                 <LogoutButton>
                                    <Button variant={"ghost"} className="w-full justify-start">
                                       Log out
                                    </Button>
                                 </LogoutButton>
                              </div>
                           </>
                        ) : (
                           <>
                              <div>
                                 <RegisterButton>
                                    <Button variant={"ghost"} className="w-full justify-start">
                                       Sign up
                                    </Button>
                                 </RegisterButton>
                                 <LoginButton>
                                    <Button variant={"ghost"} className="w-full justify-start">
                                       Log in
                                    </Button>
                                 </LoginButton>
                              </div>
                           </>
                        )}
                     </PopoverContent>
                  </Popover>
               </div>
            </div>
         </nav>
      </header>
   );
}
