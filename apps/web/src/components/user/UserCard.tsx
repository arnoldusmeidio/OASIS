import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpdateProfileForm from "@/components/user/UpdateProfileForm";
import EditProfilePictureButton from "@/components/user/EditProfilePictureButton";
import { useUserStore } from "@/stores/useUserStore";
import ChangeEmailButton from "@/components/user/ChangeEmailButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import RefCodeButton from "./ReferalCodeButton";
import RedeemRefCode from "./RedeemRefCodeForm";

interface Props {
   getUser: () => void;
}

export default function UserCard({ getUser }: Props) {
   const { user } = useUserStore();

   return (
      <Card>
         <CardHeader>
            <span className="text-2xl font-bold">User Profile</span>
         </CardHeader>
         <CardContent className="flex flex-col">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-10">
               <div className="flex flex-col items-center gap-2 self-center">
                  <Avatar className="h-20 w-20 lg:h-32 lg:w-32">
                     <AvatarImage src={user?.pictureUrl} alt="Profile picture" />
                     <AvatarFallback>
                        <User className="h-10 w-10 lg:h-14 lg:w-14" />
                     </AvatarFallback>
                  </Avatar>
                  {user?.accountProvider === "CREDENTIALS" && <EditProfilePictureButton getUser={getUser} />}
               </div>
               {user?.customer && (
                  <div className="flex items-center justify-center gap-4 sm:flex-col sm:items-start">
                     <span className="text-lg font-semibold xl:text-xl">Wallet: {user?.wallet?.balance}</span>
                     <span className="text-lg font-semibold xl:text-xl">Points: {user?.wallet?.points}</span>
                     <span>
                        <RefCodeButton getUser={getUser} />
                     </span>
                     <span>
                        <RedeemRefCode getUser={getUser} />
                     </span>
                  </div>
               )}
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
