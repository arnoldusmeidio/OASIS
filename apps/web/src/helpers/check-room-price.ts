import { RoomStatus } from "@/types/room-status";

export function checkRoomRate(date: Date, roomStatus: RoomStatus | undefined): number | undefined {
   const roomRates = roomStatus?.roomRates;
   const targetTime = date.getTime();

   if (roomRates) {
      for (const rate of roomRates) {
         const startTime = new Date(rate.startDate).getTime();
         const endTime = new Date(rate.endDate).getTime();

         if (targetTime >= startTime && targetTime <= endTime) {
            return rate.rate;
         }
      }
   }

   return roomStatus?.defaultPrice;
}
