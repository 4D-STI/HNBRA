import * as React from "react"
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"
import Banner_20_portas from '@/public/images/banner/0/banner_20_portas.png'

const ALT_1_BANNER = 'Banner da marinha do brasil. 20 portas de entradas para a marinha'

export function CarouselDemo() {
  return (
    <Carousel className="ml-14 mr-14">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src={Banner_20_portas}
              alt={ALT_1_BANNER}
              width={720}
              className="rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
