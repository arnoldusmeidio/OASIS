"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
   return (
      <div className="flex gap-2 align-middle">
         <Image
            alt="OASIS logo"
            className="hidden h-[50px] w-full cursor-pointer md:block"
            width={50}
            height={50}
            src={"/oasis-logo-only.svg"}
         />
         <h1 className={"font-rokkitt w-full pt-1 text-5xl font-semibold text-[#1A61EF]"}>OASIS</h1>
      </div>
   );
}
