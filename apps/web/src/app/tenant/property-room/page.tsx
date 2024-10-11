"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomSchema } from "@/schemas/property-schemas";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AddRoomProps {
   index: number;
   onRemove: () => void;
}

export default function Room({ index, onRemove }: AddRoomProps) {
   const form = useForm<z.infer<typeof createRoomSchema>>({
      resolver: zodResolver(createRoomSchema),
      defaultValues: {
         roomName: "", //i
         roomDescription: "", //i
         roomPictureUrl: "",
         roomPrice: 0, //i
         roomCapacity: 0, //i
      },
   });

   const { fields, remove: removeRoom } = useFieldArray({
      control: form.control,
      name: "room",
   });

   const { control } = useFormContext();

   return (
      <main>
         <div className="h-full w-[375px] content-center self-center">
            <div className="h-fit w-full py-4">
               <Card className="w-full shadow-md">
                  <FormField
                     control={control}
                     name={`room.${index}.roomName`}
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
                     control={control}
                     name={`room.${index}.roomDescription`}
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
                     control={control}
                     name={`room.${index}.price`}
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
                                    field.onChange(value ? Number(value) : 0); // Convert string to number
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={control}
                     name={`room.${index}.roomCapacity`}
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
                                    field.onChange(value ? Number(value) : 0); // Convert string to number
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={control}
                     name="roomPictureUrl"
                     render={({ field }) => {
                        return (
                           <FormItem>
                              <FormLabel>Room Picture</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="Picture" type="file" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        );
                     }}
                  />
                  <Button onClick={onRemove}>Remove Room</Button>
               </Card>
            </div>
         </div>
      </main>
   );
}
