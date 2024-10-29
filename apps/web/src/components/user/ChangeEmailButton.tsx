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
      <div>
         <Dialog>
            <DialogTrigger asChild>
               <Button type="button" variant={"secondary"} size={"sm"}>
                  Change
               </Button>
            </DialogTrigger>
            <DialogContent className="w-[300px] sm:w-[375px]">
               <DialogHeader>
                  <DialogTitle>Change Email</DialogTitle>
                  <DialogDescription>Make changes to your email here. Click save when you're done.</DialogDescription>
               </DialogHeader>
               <ChangeEmailForm />
            </DialogContent>
         </Dialog>
      </div>
   );
}
