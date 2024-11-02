export interface Booking {
   id: string;
   bookingNumber: string;
   paymentStatus: string;
   paymentType: string;
   startDate: Date;
   endDate: Date;
   amountToPay: number;
   room: {
      price: number;
      type: string;
      description: string;
   };
   customer: {};
}
