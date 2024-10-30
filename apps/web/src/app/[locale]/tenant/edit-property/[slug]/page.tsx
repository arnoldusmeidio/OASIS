"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/schemas/property-schemas";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Category } from "@/types/property-types";

export default function EditProperty({ params }: { params: { slug: string } }) {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");

   const router = useRouter();

   const form = useForm<z.infer<typeof propertySchema>>({
      resolver: zodResolver(propertySchema),
      defaultValues: {
         propertyName: "",
         propertyAddress: "",
         propertyDescription: "",
         category: Category.Hotel,
         pictureUrl: new File([], ""),
      },
      mode: "onBlur",
   });

   const {
      formState: { isSubmitting },
   } = form;

   const onSubmit = async (values: z.infer<typeof propertySchema>) => {
      try {
         const formData = new FormData();
         formData.append("propertyName", values.propertyName);
         formData.append("propertyAddress", values.propertyAddress);
         formData.append("propertyDescription", values.propertyDescription);
         formData.append("propertyCategory", values.category);
         if (values.pictureUrl) {
            formData.append("pictureUrl", values.pictureUrl);
         }

         const formDataEntries = Array.from(formData.entries());
         console.log("FormData entries:", formDataEntries);

         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/tenant/${params.slug}`, {
            method: "PUT",
            body: formData,
            credentials: "include",
         });

         const data = await response.json();
         if (data.ok) {
            toast.success(data.message, { duration: 1000 });
            setSuccess(data.message);
            form.reset();
            router.push("/");
         } else {
            toast.error(data.message, { duration: 1000 });
            setError(data.message);
         }
      } catch (error) {
         console.error(error);
         setError("Something went wrong!");
      }
   };

   console.log(onsubmit);

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               {/* Property Name */}
               <FormField
                  control={form.control}
                  name="propertyName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Property Name</FormLabel>
                        <FormControl>
                           <Input disabled={isSubmitting} placeholder="property name" {...field} type="text" />
                        </FormControl>
                     </FormItem>
                  )}
               />

               {/* Property Address */}
               <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Property Address</FormLabel>
                        <FormControl>
                           <Input disabled={isSubmitting} placeholder="Property Address" {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* Property Description */}
               <FormField
                  control={form.control}
                  name="propertyDescription"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Property Description</FormLabel>
                        <FormControl>
                           <Input disabled={isSubmitting} placeholder="Property Description" {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/* Property Categories */}
               <div>
                  <h3>Property Categories</h3>
                  {Object.values(Category).map((cat) => (
                     <div key={cat} className="gap-5">
                        <FormField
                           control={form.control}
                           name="category"
                           render={({ field }) => (
                              <FormItem>
                                 <RadioGroup
                                    className="my-1 flex items-center space-x-2"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                 >
                                    <RadioGroupItem id={cat} value={cat} />
                                    <Label htmlFor={cat}>{cat}</Label>
                                 </RadioGroup>
                              </FormItem>
                           )}
                        />
                     </div>
                  ))}
               </div>

               {/* Property Image */}
               <FormField
                  control={form.control}
                  name="pictureUrl"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Property Image</FormLabel>
                        <FormControl>
                           <Input
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                 field.onChange(event.target?.files?.[0] ?? undefined);
                              }}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormError message={error} />
               <FormSuccess message={success} />
               <Button className="w-full" type="submit">
                  Create Property
               </Button>
            </form>
         </Form>
      </>
   );
}
