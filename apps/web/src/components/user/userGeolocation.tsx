"use client";

import { AdvancedMarker, APIProvider, Map, Pin, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import Places from "./userAddPlace";
import CurrentLocButton from "./userGeolocationButton";

interface UserLocation {
   lat: number;
   lng: number;
}

export default function MainMap() {
   const [userLoc, setUserLoc] = useState<UserLocation | null>(null);
   const [propertyLoc, setPropertyLoc] = useState<UserLocation | null>(null);

   const map = useMap(); // Access the map object

   // Get user's current location
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

   // Center the map on user's location when available
   useEffect(() => {
      if (map && userLoc) {
         map.panTo(userLoc); // Pan the map to the user's current location
      }
   }, [map, userLoc]);

   const defaultCenter = userLoc ?? { lat: 0, lng: 0 };

   return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
         <Map
            defaultCenter={defaultCenter}
            defaultZoom={15}
            disableDefaultUI={false}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
         >
            {/* Display the user's current location */}
            <div className="relative">
               {userLoc && (
                  <AdvancedMarker position={userLoc}>
                     <Pin background={"#AB12CD"} glyphColor={"#FFF"} />
                  </AdvancedMarker>
               )}

               {propertyLoc && (
                  <AdvancedMarker position={propertyLoc}>
                     <Pin background={"#FF5733"} glyphColor={"#000"} /> {/* Customize Pin if needed */}
                  </AdvancedMarker>
               )}
               <CurrentLocButton userLoc={defaultCenter} />
               <Places />
            </div>
         </Map>
      </APIProvider>
   );
}
