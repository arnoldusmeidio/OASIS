// "use client";

import { useUserStore } from "@/stores/useUserStore";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function UserCard() {
   const { user } = useUserStore();
   const role = user?.tenant ? "Tenant" : user?.customer ? "Customer" : "-";

   return (
      <Card className="w-full shadow-md">
         <CardHeader>User Card</CardHeader>
         <CardContent>
            <div>Id: {user?.id}</div>
            <div>Name: {user?.name}</div>
            <div>Email: {user?.email}</div>
            <div>Role: {role}</div>
            <div>Pictureurl: {user?.pictureUrl}</div>
         </CardContent>
      </Card>
   );
}
