import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Tenant() {
   return (
      <div className="flex">
         <div className="space-x5 space-x-screen flex">
            <h1>Oasis</h1>
            <Avatar className="h-14 w-14">
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
         </div>
      </div>
   );
}
