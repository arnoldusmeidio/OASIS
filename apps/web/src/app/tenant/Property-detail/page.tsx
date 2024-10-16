import Image from "next/image";
import Hotel from "../../../../public/Hotel assset.jpg";

export default function propertydetail() {
   return (
      <>
         <div>
            <Image src={Hotel} alt={"A hotel Image"} height={200} width={200} className="" />
         </div>
      </>
   );
}
