import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function FeedbackForm() {
   return (
      <Card className="mx-auto w-full max-w-md rounded-lg border p-6 shadow-md">
         {/* Header with Bottom Border */}
         <CardHeader className="flex w-full items-center justify-between border-b pb-2">
            <div className="flex items-center">
               <Link href={"/"}>
                  <div className="flex items-center gap-2">
                     <Image
                        alt="OASIS logo"
                        className="h-[50px] w-auto cursor-pointer"
                        width={173}
                        height={50}
                        src={"/oasis-logo-with-text.svg"}
                     />
                  </div>
               </Link>
            </div>
            <div className="text-lg font-bold">
               <h1>Your Review</h1>
            </div>
         </CardHeader>

         {/* Content */}
         <CardContent className="mt-4 space-y-4">
            {/* Introduction */}
            <p className="text-center text-gray-600">We would like your review to improve our Properties.</p>

            {/* Feedback Text */}
            <div className="mt-4">
               <label className="mb-2 block text-sm font-medium text-gray-600">Please leave your review below:</label>
               <Textarea placeholder="Type your Review here..." className="w-full" />
            </div>
         </CardContent>

         {/* Footer */}
         <CardFooter className="mt-4 flex justify-end">
            <Button variant="default">Send</Button>
         </CardFooter>
      </Card>
   );
}
