// "use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import RoleHeader from "./RoleHeader";

interface CardWrapperProps {
   children: React.ReactNode;
   headerLabel: string;
}

export default function RoelCardWrapper({ children, headerLabel }: CardWrapperProps) {
   return (
      <Card className="w-full shadow-md">
         <CardHeader>
            <RoleHeader label={headerLabel} />
         </CardHeader>
         <CardContent>{children}</CardContent>
      </Card>
   );
}
