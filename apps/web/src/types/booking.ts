export interface Booking {
   id: string;
   bookingNumber: string;
   paymentStatus: string;
   startDate: Date;
   endDate: Date;
   room: {
      price: number;
      pictureUrl: string;
   };
   customer: {};
}
