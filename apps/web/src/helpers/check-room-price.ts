import { RoomStatus } from "@/types/room-status";

export function checkRoomPrice(date: Date, roomStatus: RoomStatus | undefined): number | undefined {
   const roomPrice = roomStatus?.roomPrice;
   const targetTime = date.getTime();

   if (roomPrice) {
      for (const price of roomPrice) {
         const startTime = new Date(price.startDate).getTime();
         const endTime = new Date(price.endDate).getTime();

         if (targetTime >= startTime && targetTime <= endTime) {
            return price.price / 1000;
         }
      }
   }

   const initPrice = roomStatus?.defaultPrice;
   return initPrice! / 1000;
}
