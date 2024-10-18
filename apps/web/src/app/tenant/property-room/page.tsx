"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomSchema } from "@/schemas/room-schema";
import { useForm } from "react-hook-form";

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";

interface AddRoomProps {
   index: number;
   onRemove: () => void;
}

export default function Room({ index, onRemove }: AddRoomProps) {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");

   const form = useForm<z.infer<typeof createRoomSchema>>({
      resolver: zodResolver(createRoomSchema),
      defaultValues: {
         roomName: "",
         roomDescription: "",
         roomPictureUrl: new File([], ""),
         roomPrice: 0,
         roomCapacity: 0,
      },
      mode: "onBlur",
   });

   const {
      formState: { isSubmitting },
   } = form;

   const onSubmit = () => {};

   return (
      <main>
         <div className="h-full w-[375px] content-center self-center">
            <div className="h-fit w-full py-4">
               <Card className="w-full shadow-md">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                           control={form.control}
                           name={"roomName"}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Room Name</FormLabel>
                                 <FormControl>
                                    <Input {...field} placeholder="Room Name" />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name={"roomDescription"}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Room Description</FormLabel>
                                 <FormControl>
                                    <Input {...field} placeholder="Room Description" />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name={"roomPrice"}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Room Price</FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       placeholder="Price"
                                       type="number"
                                       onChange={(e) => {
                                          const value = e.target.value;
                                          field.onChange(value ? value : "0"); // Convert string to number
                                       }}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name={"roomCapacity"}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Room Capacity</FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       placeholder="Capacity"
                                       type="number"
                                       onChange={(e) => {
                                          const value = e.target.value;
                                          field.onChange(value ? value : "0"); // Convert string to number
                                       }}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name={"roomPictureUrl"}
                           render={({ field }) => {
                              return (
                                 <FormItem>
                                    <FormLabel>Room Picture</FormLabel>
                                    <FormControl>
                                       <Input
                                          disabled={isSubmitting}
                                          type="file"
                                          accept="image/*"
                                          onChange={(event) => {
                                             field.onChange(event.target?.files?.[0] ?? undefined);
                                          }}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              );
                           }}
                        />
                     </form>
                     <Button onClick={onRemove}>Remove Room</Button>
                  </Form>
               </Card>
            </div>
         </div>
      </main>
   );
}
