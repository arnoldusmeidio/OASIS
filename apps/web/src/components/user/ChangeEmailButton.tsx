import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import ChangeEmailForm from "@/components/auth/ChangeEmailForm";

export default function ChangeEmailButton() {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button type="button" variant={"secondary"} size={"sm"}>
               Change
            </Button>
         </DialogTrigger>
         <DialogContent className="w-[375px]">
            <DialogHeader>
               <DialogTitle>Change Email</DialogTitle>
               <DialogDescription>Make changes to your email here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <ChangeEmailForm />
         </DialogContent>
      </Dialog>
   );
}
