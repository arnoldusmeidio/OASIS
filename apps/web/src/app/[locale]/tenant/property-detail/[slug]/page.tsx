"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Property } from "@/types/property-types";
import { Card, CardContent } from "@/components/ui/card";
import CurrentLocButton from "@/components/tenant/maps-button";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

export default function PropertyDetails({ params }: { params: { slug: string } }) {
   const [getProperty, setGetProperty] = useState<Property>();
   const [isLoading, setIsLoading] = useState(true);
   const [userLoc, setUserLoc] = useState<{ lat: number; lng: number }>();

   useEffect(() => {
      const propertyGetter = async () => {
         try {
            const get = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/property/${params.slug}`, {
               method: "GET",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            });
            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition((loc) => {
                  setUserLoc({ lat: loc.coords.latitude, lng: loc.coords.longitude });
               });
            }

            const getData = await get.json();
            setGetProperty(getData.data);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      propertyGetter();
   }, [params.slug]);

   return (
      <div className="mx-auto w-full max-w-6xl p-4">
         {isLoading ? (
            <h1>sabar ya compilingnya Lama...</h1>
         ) : getProperty ? (
            <>
               <h1 className="my-5 text-2xl font-bold text-gray-800">{getProperty.name}</h1>

               {/* Property Image Section */}
               {getProperty.propertyPictures.length > 1 ? (
                  <Carousel
                     className="w-full rounded-lg shadow-md"
                     plugins={[
                        Autoplay({
                           delay: 2000,
                        }),
                     ]}
                  >
                     <CarouselContent>
                        {getProperty.propertyPictures.map((picture, index) => (
                           <CarouselItem key={index}>
                              <Link href={`/tenant/room-detail/${getProperty.id}`}>
                                 <Image
                                    src={picture.url || "/placeholder.jpg"}
                                    alt={`Property picture ${index + 1}`}
                                    width={800}
                                    height={400}
                                    className="h-72 w-full rounded-lg object-cover"
                                 />
                              </Link>
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                  </Carousel>
               ) : (
                  <Link href={`/tenant/room-detail/${getProperty.id}`}>
                     <Image
                        src={getProperty.propertyPictures[0]?.url || "/placeholder.jpg"}
                        alt="Property picture"
                        width={800}
                        height={400}
                        className="h-72 w-full rounded-lg object-cover"
                     />
                  </Link>
               )}

               {/* Property Details */}
               <div className="my-5 flex flex-col md:flex-row">
                  <div className="w-full pr-4 md:w-2/3">
                     <h2 className="text-xl font-semibold">{getProperty.name}</h2>
                     <p className="mt-1 text-gray-600">{getProperty.description}</p>
                     <p className="mt-1 text-gray-500">
                        📍 {getProperty.address}, {getProperty.city}
                     </p>

                     {/* Property Category */}
                     <Badge className="mt-2 w-fit bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {getProperty.category}
                     </Badge>

                     {/* Rooms */}
                     {getProperty.room.map((room) => (
                        <Card key={room.id} className="mt-5 rounded-lg shadow-lg">
                           <CardContent>
                              {/* Room Image Carousel without Arrow Buttons */}
                              {room.roomPictures.length > 1 ? (
                                 <Carousel
                                    className="w-full rounded-lg shadow-md"
                                    plugins={[
                                       Autoplay({
                                          delay: 2000,
                                       }),
                                    ]}
                                 >
                                    <CarouselContent>
                                       {room.roomPictures.map((pic, i) => (
                                          <CarouselItem key={i}>
                                             <Link href={`/tenant/room-detail/${room.id}`}>
                                                <Image
                                                   src={pic.url || "/placeholder.jpg"}
                                                   alt={`Room picture ${i + 1}`}
                                                   width={400}
                                                   height={300}
                                                   className="h-60 w-full rounded-lg object-cover"
                                                />
                                             </Link>
                                          </CarouselItem>
                                       ))}
                                    </CarouselContent>
                                 </Carousel>
                              ) : (
                                 <Link href={`/tenant/room-detail/${room.id}`}>
                                    <Image
                                       src={room.roomPictures[0]?.url || "/placeholder.jpg"}
                                       alt="Room picture"
                                       width={400}
                                       height={300}
                                       className="h-60 w-full rounded-lg object-cover"
                                    />
                                 </Link>
                              )}

                              {/* Room Details */}
                              <div className="flex justify-between">
                                 <div>
                                    <h3 className="mt-3 text-lg font-semibold">
                                       {room.type} (Capacity: {room.roomCapacity})
                                    </h3>
                                    <p className="text-sm text-gray-600">Default Price: ${room.defaultPrice}</p>
                                 </div>
                                 <div>
                                    <Button className="my-3 bg-blue-600 px-4 py-2 text-white hover:bg-blue-600">
                                       <Link href={`/tenant/create-room?propertyId=${getProperty.id}`}>Edit Room</Link>
                                    </Button>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>

                  {/* Google Maps */}
                  <div className="mt-5 h-80 w-full rounded-lg md:mt-0 md:w-1/3">
                     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                        <Map
                           defaultCenter={{ lat: getProperty.lat, lng: getProperty.lng }}
                           defaultZoom={15}
                           disableDefaultUI={true}
                           mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                        >
                           <AdvancedMarker position={{ lat: getProperty.lat, lng: getProperty.lng }}>
                              <Pin />
                           </AdvancedMarker>
                           {userLoc && (
                              <>
                                 <AdvancedMarker position={userLoc}>
                                    <Pin />
                                 </AdvancedMarker>
                                 {/* <CurrentLocButton userLoc={userLoc} /> */}
                              </>
                           )}
                        </Map>
                     </APIProvider>
                  </div>
               </div>

               {/* Booking and Amenities */}
               <div className="mt-10 flex justify-between">
                  <div className="flex flex-wrap space-x-2 text-sm text-gray-600">
                     <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Wi-Fi</Badge>
                     <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Breakfast</Badge>
                     {/* Add more amenities as needed */}
                  </div>
                  <Button className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-600">
                     <Link href={`/tenant/create-room?propertyId=${getProperty.id}`}>Create Room</Link>
                  </Button>
               </div>
            </>
         ) : (
            <p className="text-center text-gray-600">No property found.</p> // Fallback if getProperty is undefined
         )}
      </div>
   );
}
