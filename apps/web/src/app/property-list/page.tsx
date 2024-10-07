"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const createRoom = z.object({
   roomName: z.string().min(1).max(100),
   roomDescription: z.string().min(1).max(100),
   roomPictureUrl: z.string().min(1).max(100),
   price: z.number().min(1),
   roomCapacity: z.number().min(1).max(50),
});

const formSchema = z.object({
   propertyName: z.string().min(1).max(50),
   propertyAddress: z.string().min(1).max(50),
   propertyDescription: z.string().min(1).max(100),
   pictureUrl: z.string().min(1).max(150),
   room: z.array(createRoom).min(1, { message: "There should be at least 1 room" }),
});

export default function Property() {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         propertyName: "",
         propertyAddress: "",
         propertyDescription: "",
         pictureUrl: "",
         room: [],
      },
   });

   const handleSubmit = () => {};
   return (
      <>
         <Form {...form}>
            {/* Property Name */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
               <FormField
                  control={form.control}
                  name="propertyName"
                  render={({ field }) => {
                     return (
                        <FormItem>
                           <FormLabel>Property Name</FormLabel>
                           <FormControl>
                              <input type="text" placeholder="Property name" {...field} />
                           </FormControl>
                        </FormItem>
                     );
                  }}
               />
            </form>
            {/* Property Address */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
               <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => {
                     return (
                        <FormItem>
                           <FormLabel>Property Address</FormLabel>
                           <FormControl>
                              <input type="text" placeholder="Property Address" {...field} />
                           </FormControl>
                        </FormItem>
                     );
                  }}
               />
            </form>
            {/* Property Description */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
               <FormField
                  control={form.control}
                  name="propertyDescription"
                  render={({ field }) => {
                     return (
                        <FormItem>
                           <FormLabel>Property Description</FormLabel>
                           <FormControl>
                              <input type="text" placeholder="Property Description" {...field} />
                           </FormControl>
                        </FormItem>
                     );
                  }}
               />
            </form>
            
         </Form>
      </>
   );
}
