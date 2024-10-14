"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
   return (
      <Link href={"/"}>
         <div className="flex justify-center gap-2 align-middle">
            <Image
               alt="OASIS logo"
               className="h-[60px] w-full cursor-pointer"
               width={60}
               height={60}
               src={"/oasis-logo-only-white.svg"}
            />
            <h1 className={"font-rokkitt text-background w-full pt-3 text-5xl font-semibold"}>OASIS</h1>
         </div>
      </Link>
   );
}
