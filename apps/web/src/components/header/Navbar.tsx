"use client";

import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, User, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import LoginButton from "../auth/LoginButton";
import RegisterButton from "../auth/RegisterButton";

export default function Navbar() {
   const { user } = useUserStore();

   return (
      <header className="sticky top-0 z-50 w-full">
         <nav className="bg-main-theme mx-auto grid grid-cols-6 gap-4 p-3 shadow-sm sm:p-6 lg:px-8">
            {/* Left */}
            <div className="order-1 col-span-4 flex sm:col-span-2">
               <Logo />
            </div>

            {/* Middle tagline */}
            <div className="text-background order-3 col-span-3 hidden self-center justify-self-start pl-10 font-bold sm:flex lg:hidden">
               <span className="font-rokkitt text-xl tracking-wide md:text-2xl">Discover Hidden Havens</span>
            </div>

            {/* Middle search */}
            <div className="bg-background order-last col-span-6 flex w-full max-w-5xl items-center justify-center justify-self-center rounded-full border-2 p-2 shadow-md lg:order-3 lg:col-span-2">
               <Input
                  type="text"
                  className="flex-grow rounded-full border-none bg-transparent text-base focus-visible:ring-transparent xl:text-lg"
                  placeholder="Start your search"
               />
               <div>
                  <Search className="text-background bg-main-theme h-10 w-10 rounded-full p-2" />
               </div>
            </div>

            {/* Right */}
            {/* Desktop menu */}
            <div className="order-6 col-span-2 flex items-center justify-end align-middle sm:col-span-1 lg:order-last lg:col-span-2">
               {user ? (
                  <div className="hidden gap-3 lg:flex xl:gap-10">
                     <Button
                        variant={"link"}
                        className="text-background w-full justify-start text-base font-bold xl:text-xl"
                        asChild
                     >
                        <Link href={"/user/profile"}>Profile</Link>
                     </Button>
                     <Button
                        variant={"link"}
                        className="text-background w-full justify-start text-base font-bold xl:text-xl"
                        asChild
                     >
                        <Link href={"/user/bookings"}>Bookings</Link>
                     </Button>
                     <LogoutButton>
                        <Button
                           variant={"link"}
                           className="text-background w-full justify-start text-base font-bold xl:text-xl"
                        >
                           Log out
                        </Button>
                     </LogoutButton>
                  </div>
               ) : (
                  <div className="hidden gap-3 lg:flex 2xl:gap-10">
                     <RegisterButton>
                        <Button
                           variant={"link"}
                           className="text-foreground w-full justify-start p-0 text-base font-bold xl:text-xl"
                        >
                           Become a tenant
                        </Button>
                     </RegisterButton>
                     <RegisterButton>
                        <Button variant={"secondary"} className="w-full justify-start text-base xl:text-xl">
                           Sign up
                        </Button>
                     </RegisterButton>
                     <LoginButton>
                        <Button variant={"secondary"} className="w-full justify-start text-base xl:text-xl">
                           Log in
                        </Button>
                     </LoginButton>
                  </div>
               )}

               {/* Burger menu */}
               <Popover>
                  <PopoverTrigger asChild>
                     <Button
                        variant="outline"
                        className="flex justify-between gap-4 rounded-full py-7 pl-4 pr-2 lg:hidden"
                     >
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
                                 <Link href={"/user/bookings"}>Bookings</Link>
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
         </nav>
      </header>
   );
}
