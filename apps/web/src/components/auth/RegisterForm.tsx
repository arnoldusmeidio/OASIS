"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { emailVerificationSchema } from "@/schemas";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import CardWrapper from "./CardWrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterForm() {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");

   const searchParams = useSearchParams();
   const errorMessage = searchParams.get("error");

   useEffect(() => {
      if (errorMessage) setError(errorMessage);
   }, []);

   const router = useRouter();

   const form = useForm<z.infer<typeof emailVerificationSchema>>({
      resolver: zodResolver(emailVerificationSchema),
      mode: "onBlur",
      defaultValues: {
         email: "",
      },
   });

   const {
      formState: { isSubmitting },
   } = form;

   const onSubmit = async (values: z.infer<typeof emailVerificationSchema>) => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/email-verification`, {
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
      }
   };

   return (
      <CardWrapper
         headerLabel="Create an account"
         backButtonLabel="Already have an account"
         backButtonHref="/login"
         showSocial
         socialLabel="Signup with Google"
      >
         <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input {...field} disabled={isSubmitting} placeholder="john.doe@email.com" type="email" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button className="w-full" type="submit" disabled={isSubmitting}>
                  Create account
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
}
