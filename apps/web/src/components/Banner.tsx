import * as React from "react";
import EmblaCarousel from "@/components/ui/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { bannerData } from "@/static-db";

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

export default function Banner() {
   return (
      <div>
         <EmblaCarousel slides={bannerData} options={OPTIONS} />
      </div>
   );
}
