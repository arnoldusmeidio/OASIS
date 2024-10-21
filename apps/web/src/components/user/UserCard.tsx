import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpdateProfileForm from "@/components/user/UpdateProfileForm";
import EditProfilePictureButton from "@/components/user/EditProfilePictureButton";
import { useUserStore } from "@/stores/useUserStore";
import ChangeEmailButton from "@/components/user/ChangeEmailButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface Props {
   getUser: () => void;
}

export default function UserCard({ getUser }: Props) {
   const { user } = useUserStore();
   console.log(user?.pictureUrl);

   return (
      <Card>
         <CardHeader>
            <span className="text-2xl font-bold">User Profile</span>
         </CardHeader>
         <CardContent className="flex flex-col">
            <div className="flex flex-col items-center gap-2 self-center">
               <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.pictureUrl} alt="Profile picture" />
                  <AvatarFallback>
                     <User className="h-10 w-10" />
                  </AvatarFallback>
               </Avatar>
               {user?.accountProvider === "CREDENTIALS" && <EditProfilePictureButton getUser={getUser} />}
            </div>

            <div className="mt-6 flex items-end justify-between gap-2">
               <div className="w-full space-y-2">
                  <Label>Email</Label>
                  <Input placeholder={user?.email || "example@mail.com"} type="email" disabled={true} />
               </div>
               {user?.accountProvider === "CREDENTIALS" && <ChangeEmailButton />}
            </div>

            <hr className="bg-foreground/50 my-6 h-[2px] border-0" />

            <UpdateProfileForm getUser={getUser} />
         </CardContent>
      </Card>
   );
}
