"use client";

import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface UserLocation {
   lat: number;
   lng: number;
}

export default function MainMap() {
   const [userLoc, setUserLoc] = useState<UserLocation | null>(null);

   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (loc) => {
               setUserLoc({ lat: loc.coords.latitude, lng: loc.coords.longitude });
            },
            (error) => {
               console.error("Error fetching location: ", error);
            },
         );
      } else {
         console.error("Geolocation is not supported by this browser.");
      }
   }, []);

   return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
         <Map center={userLoc} zoom={15} disableDefaultUI={false} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}>
            {/* Display the user's current location */}
            <AdvancedMarker position={userLoc}>
               <Pin background={"#AB12CD"} glyphColor={"#FFF"} /> {/* Customize Pin if needed */}
            </AdvancedMarker>
         </Map>
      </APIProvider>
   );
}
