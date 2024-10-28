import { RoomStatus } from "@/types/room-status";

export function checkRoomPrice(date: Date, roomStatus: RoomStatus | undefined): number | undefined {
   const roomPrice = roomStatus?.roomPrice;
   const targetTime = date.getTime();

   if (roomPrice) {
      for (const rate of roomPrice) {
         const startTime = new Date(rate.startDate).getTime();
         const endTime = new Date(rate.endDate).getTime();

         if (targetTime >= startTime && targetTime <= endTime) {
            return rate.price;
         }
      }
   }

   return roomStatus?.defaultPrice;
}
