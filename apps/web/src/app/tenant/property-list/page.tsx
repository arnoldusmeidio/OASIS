"use client";

import * as z from "zod";
import Room from "../property-room/page";

import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/schemas/property-schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { remove } from "cypress/types/lodash";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Property() {
   const form = useForm<z.infer<typeof propertySchema>>({
      resolver: zodResolver(propertySchema),
      defaultValues: {
         propertyName: "",
         propertyAddress: "",
         propertyDescription: "",
         propertyImage: "",
         room: [
            {
               roomName: "",
               roomDescription: "",
               roomCapacity: 0,
               roomPrice: 0,
               roomPictureUrl: "",
            },
         ],
      },
   });

   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "room",
   });

   const {
      formState: { isSubmitting },
   } = form;

   const handleSubmit = () => {};
   return (
      <>
         <div className="h-full w-[375px] content-center self-center">
            <div className="h-fit w-full py-4">
               <Card className="w-full shadow-md">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(handleSubmit)} className="">
                        {/* Property Name */}
                        <FormField
                           control={form.control}
                           name="propertyName"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Property Name</FormLabel>
                                    <FormControl>
                                       <Input placeholder="property Name" {...field} type="text" />
                                    </FormControl>
                                 </FormItem>
                              );
                           }}
                        />
                        {/* Property Address */}
                        <FormField
                           control={form.control}
                           name="propertyAddress"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Property Name</FormLabel>
                                    <FormControl>
                                       <Input placeholder="property Name" {...field} type="text" />
                                    </FormControl>
                                 </FormItem>
                              );
                           }}
                        />
                        {/* Property Description */}
                        <FormField
                           control={form.control}
                           name="propertyDescription"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Property Name</FormLabel>
                                    <FormControl>
                                       <Input placeholder="property Name" {...field} type="text" />
                                    </FormControl>
                                 </FormItem>
                              );
                           }}
                        />
                        {/* Property Image */}
                        <FormField
                           control={form.control}
                           name="propertyImage"
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Property Name</FormLabel>
                                    <FormControl>
                                       <Input placeholder="property Name" {...field} type="text" />
                                    </FormControl>
                                 </FormItem>
                              );
                           }}
                        />
                        <div>
                           {fields.map((field, index) => (
                              <Room key={field.id} index={index} onRemove={() => remove(index)} />
                           ))}
                           <Button
                              onClick={() =>
                                 append({ roomName: "", roomDescription: "", roomPrice: 0, roomCapacity: 1 })
                              }
                           >
                              Add Room
                           </Button>
                        </div>
                        <Button onSubmit={handleSubmit}>Submit</Button>
                     </form>
                  </Form>
               </Card>
            </div>
         </div>
      </>
   );
}
