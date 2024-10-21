"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUserStore } from "@/stores/useUserStore";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import { profilePictureSchema } from "@/schemas/profile-schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChangeProfilePictureForm() {
   const { user } = useUserStore();

   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [picture, setPicture] = useState(user?.pictureUrl);

   const searchParams = useSearchParams();
   const errorMessage = searchParams.get("error");

   useEffect(() => {
      if (errorMessage) setError(errorMessage);
   }, []);

   const router = useRouter();

   const form = useForm<z.infer<typeof profilePictureSchema>>({
      resolver: zodResolver(profilePictureSchema),
      mode: "onSubmit",
      defaultValues: {
         pictureUrl: new File([], ""),
      },
   });

   const {
      watch,
      formState: { isSubmitting },
   } = form;

   const onSubmit = async (values: z.infer<typeof profilePictureSchema>) => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/user/email`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include",
         });
         const data = await response.json();

         if (!data.ok) {
            setSuccess("");
            setError(data.message);
         } else {
            setError("");
            setSuccess(data.message);
            form.reset();
            router.refresh();
         }
      } catch (error) {
         console.error(error);
         setError("Something went wrong!");
      }
   };

   return (
      <>
         <Avatar className="h-20 w-20 justify-self-center">
            <AvatarImage src={picture} alt="Profile picture" />
            <AvatarFallback>
               {/* <AvatarImage src={user?.pictureUrl} alt="Profile picture" /> */}
               <User className="h-10 w-10" />
            </AvatarFallback>
         </Avatar>
         <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="pictureUrl"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Profile Picture</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={isSubmitting}
                                 type="file"
                                 accept="image/*"
                                 onChange={(event) => {
                                    field.onChange(event.target?.files?.[0] ?? undefined);
                                    setPicture(
                                       event.target?.files?.[0]
                                          ? URL.createObjectURL(event.target?.files?.[0])
                                          : undefined,
                                    );
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button className="w-full" type="submit" disabled={isSubmitting}>
                  Save
               </Button>
            </form>
         </Form>
      </>
   );
}