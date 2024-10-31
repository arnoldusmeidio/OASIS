"use client";

import FormError from "@/components/FormError";
import SearchNavbar from "@/components/header/SearchNavbar";
import PropertyPicturesCarousel from "@/components/property/PropertyPicturesCarousel";
import CurrentLocButton from "@/components/tenant/maps-button";
import { Property } from "@/types/property-types";
import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RoomPicturesCarousel from "@/components/property/RoomPicturesCarousel";
import { currency } from "@/lib/currency";
import useCurrencyStore from "@/stores/useCurrencyStore";
import { useUserStore } from "@/stores/useUserStore";
import PropertySkeleton from "@/components/PropertySkeleton";
import CheckAvailabilityButton from "@/components/property/CheckAvailabilityButton";

export default function page({ params }: { params: { slug: string } }) {
   const [property, setProperty] = useState<Property>();
   const [isLoading, setIsLoading] = useState(true);
   const [currencyLoading, setCurrencyLoading] = useState(true);
   const { user } = useUserStore();
   const [errorMessage, setErrorMessage] = useState("");
   const [userLoc, setUserLoc] = useState<{ lat: number; lng: number }>();
   const { currencyRate, error, getCurrencyRate } = useCurrencyStore();

   const getProperty = async () => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/property/${params.slug}`, {
            credentials: "include",
         });
         const data = await response.json();
         if (!data.ok) {
            setErrorMessage(data.message);
         } else {
            setProperty(data.data);
         }
         setIsLoading(false);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getProperty();
      if (user?.currency && user.currency != "IDR") {
         setCurrencyLoading(true);
         getCurrencyRate();
         setCurrencyLoading(false);
      } else {
         setCurrencyLoading(false);
      }
   }, [user?.currency, getCurrencyRate]);

   if (!isLoading && !property) {
      return (
         <div className="max-w-[500px] justify-self-center">
            <FormError message={errorMessage} />
         </div>
      );
   }

   return (
      <>
         {isLoading || !property || currencyLoading ? (
            <PropertySkeleton />
         ) : (
            <div className="mx-auto max-w-7xl p-4 pt-0 lg:px-8">
               {/* Carousel of property pics */}
               <div className="h-auto w-full overflow-hidden rounded-lg sm:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]">
                  <PropertyPicturesCarousel property={property} />
               </div>

               {/* Property Details */}
               <div className="my-5 flex flex-col lg:flex-row">
                  <div className="w-full lg:w-2/3 lg:pr-4">
                     <h2 className="text-xl font-semibold">{property.name}</h2>
                     <p className="mt-1 text-gray-600">{property.description}</p>
                     <p className="mt-1 text-gray-500">
                        📍 {property.address}, {property.city}
                     </p>

                     {/* Property Category */}
                     <Badge className="mt-2 w-fit bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {property.category}
                     </Badge>

                     {/* Rooms */}
                     {property.room.map((room) => (
                        <Card key={room.id} className="mt-5 rounded-lg shadow-lg">
                           <CardContent>
                              {/* Room Image Carousel without Arrow Buttons */}
                              <RoomPicturesCarousel room={room} />

                              {/* Room Details */}
                              <div className="flex items-end justify-between">
                                 <div>
                                    <h3 className="mt-3 text-lg font-semibold">
                                       {room.type} (Capacity: {room.roomCapacity} person(s))
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                       Price per night starts from:
                                       {!currencyRate
                                          ? currency(room?.defaultPrice, "IDR", 1)
                                          : currency(room?.defaultPrice, user?.currency, currencyRate)}
                                    </p>
                                 </div>
                                 {/* <Button className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-600">
                                    Check Availability
                                 </Button> */}
                                 <CheckAvailabilityButton />
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>

                  {/* Google Maps */}
                  <div className="mt-5 h-80 w-full lg:mt-0 lg:w-1/3">
                     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
                        <Map
                           defaultCenter={{ lat: property.lat, lng: property.lng }}
                           defaultZoom={15}
                           disableDefaultUI={true}
                           mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                        >
                           <AdvancedMarker position={{ lat: property.lat, lng: property.lng }}>
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
               <div className="mt-4 flex justify-between">
                  <div className="flex flex-col gap-2">
                     <span className="block">Amenities:</span>
                     <div className="flex flex-wrap space-x-2 text-sm text-gray-600">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Wi-Fi</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Breakfast</Badge>
                        {/* Add more amenities as needed */}
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
