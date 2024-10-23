import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import ChangeProfilePictureForm from "@/components/user/ChangeProfilePictureForm";

interface Props {
   getUser: () => void;
}

export default function EditProfilePictureButton({ getUser }: Props) {

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button type="button" variant={"secondary"} size={"sm"}>
               Edit
            </Button>
         </DialogTrigger>
         <DialogContent className="w-[375px]">
            <DialogHeader>
               <DialogTitle>Change Profile Picture</DialogTitle>
               <DialogDescription>
                  Make changes to your profile picture here. Click save when you're done.
               </DialogDescription>
            </DialogHeader>
            <ChangeProfilePictureForm getUser={getUser} />
         </DialogContent>
      </Dialog>
   );
}
