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
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export default function Room() {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [images, setImages] = useState<File[]>([]);
   const [imagesPreview, setImagesPreview] = useState<string[]>([]);

   const form = useForm<z.infer<typeof createRoomSchema>>({
      resolver: zodResolver(createRoomSchema),
      defaultValues: {
         roomName: "",
         roomDescription: "",
         roomPictures: [],
         defaultPrice: 0,
         roomCapacity: 0,
      },
      mode: "onBlur",
   });

   const {
      formState: { isSubmitting },
   } = form;

   const router = useRouter();

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(e.target.files || []);
      const updatedFiles = [...images, ...newFiles];
      setImages(updatedFiles);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagesPreview((prevPreviews) => [...prevPreviews, ...newPreviews]);
   };

   const searchParams = useSearchParams();
   const propertyId = searchParams.get(`propertyId`);

   const onSubmit = async (values: z.infer<typeof createRoomSchema>) => {
      try {
         if (!propertyId) {
            setError("Property ID is missing.");
            return;
         }

         const formData = new FormData();
         formData.append("roomName", values.roomName);
         formData.append("roomDescription", values.roomDescription);
         formData.append("defaultPrice", values.defaultPrice.toString());
         formData.append("roomCapacity", values.roomCapacity.toString());
         images.forEach((file) => formData.append("roomPictures", file));

         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/room/${propertyId}`, {
            method: "POST",
            body: formData,
            credentials: "include",
         });

         const data = await response.json();
         if (data.ok) {
            toast(data.message, { duration: 1000 });
            setSuccess(data.message);
            form.reset();
            setImages([]); // Clear images after form reset
            setImagesPreview([]); // Clear previews after form reset
            router.push(`/tenant/property-detail/${propertyId}`);
         } else {
            toast.error(data.message, { duration: 1000 });
            setError(data.message);
         }
      } catch (error) {
         console.error(error);
         setError("Something went wrong!");
      }
   };

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
                           name={"defaultPrice"}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Default Room Price in IDR</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       {...field}
                                       placeholder="Room Price"
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
                                       type="number"
                                       {...field}
                                       placeholder="capacity"
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
                           name="roomPictures"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Property Images</FormLabel>
                                 <div>
                                    <Input
                                       type="file"
                                       accept="image/*"
                                       multiple
                                       onChange={onChange}
                                       disabled={images.length >= 5}
                                    />
                                    <div className="mt-2 flex space-x-2">
                                       {imagesPreview?.map((img, index) => (
                                          <Image
                                             src={img}
                                             key={index}
                                             alt={`preview-${index}`}
                                             className="border-gray h-24 w-24 rounded border-2 object-contain p-2 shadow"
                                             width={50}
                                             height={50}
                                          />
                                       ))}
                                    </div>
                                 </div>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button className="w-full" type="submit">
                           Create Room
                        </Button>
                     </form>
                  </Form>
               </Card>
            </div>
         </div>
      </main>
   );
}
