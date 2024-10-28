export interface RoomStatus {
   id: string;
   title: string;
   defaultPrice: number;
   roomPrice: { startDate: string; endDate: string; price: number }[];
   booking: { startDate: string; endDate: string }[];
}
