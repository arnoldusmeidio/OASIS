export enum Category {
   Villa = "Vila",
   Hotel = "Hotel",
   Apartment = "Apartment",
}

export interface Property {
   address: string;
   category: Category;
   description: string;
   id: string;
   lat: number;
   lng: number;
   name: string;
   tenantId: string;
   propertyPictures: {
      url: string;
   }[];
   reviews: {
      bookingId: string;
      customerId: string;
      id: string;
      review: string;
      star: number;
   }[];
   room: {
      defaultPrice: number;
      id: string;
      roomCapacity: number;
      type: string;
      roomPrice: {
         price: number;
         startDate: Date;
         endDate: Date;
      }[];
   }[];
}
