import { Property } from "@/types/property-types";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Props = {
   property: Property;
};

export default function PropertyPicturesCarousel({ property }: Props) {
   return (
      <div>
         {property.propertyPictures?.length === 1 ? (
            // Single Card Display
            <Card className="w-full overflow-hidden rounded-lg shadow-lg">
               <Image
                  src={property.propertyPictures[0].url || "/placeholder.jpg"}
                  alt="Property picture"
                  width={1500}
                  height={1000}
                  className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]"
               />
               <CardContent>
                  <h2 className="text-lg font-semibold">{property.name}</h2>
                  <p className="text-sm text-gray-600">{property.description}</p>
                  <div className="mt-2 w-fit rounded-xl border-2 border-black px-2 py-1">
                     <p className="text-xs font-medium">{property.category}</p>
                  </div>
               </CardContent>
            </Card>
         ) : (
            // Carousel Display for Multiple Images
            <Carousel>
               <CarouselContent className="w-full rounded-lg shadow-lg">
                  {property.propertyPictures.map((picture, index) => (
                     <CarouselItem key={index}>
                        <Image
                           src={picture.url || "/placeholder.jpg"}
                           alt={`Property picture ${index + 1}`}
                           width={1500}
                           height={1000}
                           className="h-[300px] w-full rounded-lg object-cover sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]"
                        />
                     </CarouselItem>
                  ))}
               </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
            </Carousel>
         )}
      </div>
   );
}
