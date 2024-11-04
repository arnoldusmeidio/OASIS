"use client";

import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/schemas/review-schemas";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { useRouter } from "@/i18n/routing"; // Your custom routing

export default function CreateReview({ params }: { params: { bookingNumber: string } }) {
   const router = useRouter();
   const [error, setError] = useState<string | undefined>(undefined);
   const [success, setSuccess] = useState<string | undefined>(undefined);

   const form = useForm<z.infer<typeof reviewSchema>>({
      resolver: zodResolver(reviewSchema),
      defaultValues: {
         review: "",
         star: 0,
      },
      mode: "onBlur",
   });

   const {
      formState: { isSubmitting },
   } = form;

   const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/users/review/${params.bookingNumber}/`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(values),
               credentials: "include",
            },
         );

         const data = await response.json();
         if (data.ok) {
            toast(data.message, { duration: 1000 });
            setSuccess(data.message);
            form.reset();
            router.push("/");
         } else {
            toast.error(data.message, { duration: 1000 });
            setError(data.message);
         }
      } catch (error) {
         console.error(error);
         setError("something is wrong!");
      }
   };

   return (
      <Card className="mx-auto w-full max-w-md rounded-lg border p-6 shadow-md">
         {/* Header */}
         <CardHeader className="flex w-full items-center justify-between border-b pb-2">
            <div className="flex items-center">
               <Image
                  alt="OASIS logo"
                  className="h-[50px] w-auto cursor-pointer"
                  width={173}
                  height={50}
                  src="/oasis-logo-with-text.svg"
               />
            </div>
            <div>
               <h1 className="text-xl font-semibold">Your Review</h1>
            </div>
         </CardHeader>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <CardContent className="mt-4 space-y-4">
                  <p className="text-center text-gray-600">We would love to hear your feedback on this property.</p>

                  {/* Star Rating */}
                  <FormField
                     control={form.control}
                     name="star"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Rating</FormLabel>
                           <RadioGroup
                              className="flex space-x-2"
                              value={field.value.toString()}
                              onValueChange={(value) => field.onChange(Number(value))}
                           >
                              {[1, 2, 3, 4, 5].map((star) => (
                                 <RadioGroupItem key={star} value={star.toString()}>
                                    {star} Star{star > 1 ? "s" : ""}
                                 </RadioGroupItem>
                              ))}
                           </RadioGroup>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Review Text */}
                  <FormField
                     control={form.control}
                     name="review"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Your Review</FormLabel>
                           <FormControl>
                              <Textarea
                                 disabled={isSubmitting}
                                 placeholder="Write your review here"
                                 {...field}
                                 className="mt-1 h-32 w-full resize-none rounded-md border p-2"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </CardContent>

               <FormError message={error} />
               <FormSuccess message={success} />

               {/* Footer */}
               <CardFooter className="mt-4 flex justify-end">
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                     Submit Review
                  </Button>
               </CardFooter>
            </form>
         </Form>
      </Card>
   );
}
