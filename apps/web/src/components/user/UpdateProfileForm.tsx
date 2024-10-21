import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { profileSchema } from "@/schemas/profile-schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdateProfileForm() {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");

   const { user } = useUserStore();

   const form = useForm<z.infer<typeof profileSchema>>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
         name: user?.name || undefined,
         email: user?.email || undefined,
         password: undefined,
         newPassword: undefined,
         confirmNewPassword: undefined,
      },
      mode: "onBlur",
   });

   const {
      formState: { isSubmitting },
   } = form;

   const onSubmit = async (values: z.infer<typeof profileSchema>) => {
      console.log(values);
      try {
         // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/login`, {
         //    method: "UPDATE",
         //    headers: {
         //       "Content-Type": "application/json",
         //    },
         //    body: JSON.stringify(values),
         //    credentials: "include",
         // });
         // const data = await response.json();
         // if (!data.ok) {
         //    setSuccess("");
         //    setError(data.message);
         // } else {
         //    setError("");
         //    setSuccess(data.message);
         // }
      } catch (error) {
         console.error(error);
         setError("Something went wrong!");
      }
   };

   return (
      <Form {...form}>
         <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              placeholder={user?.name || "Your name"}
                              disabled={isSubmitting}
                              value={field.value ?? ""}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               {user?.accountProvider === "CREDENTIALS" && (
                  <>
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder="********"
                                    type="password"
                                    disabled={isSubmitting}
                                    value={field.value ?? ""}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder="********"
                                    type="password"
                                    disabled={isSubmitting}
                                    value={field.value ?? ""}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder="********"
                                    type="password"
                                    disabled={isSubmitting}
                                    value={field.value ?? ""}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </>
               )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full" type="submit">
               Update
            </Button>
         </form>
      </Form>
   );
}
