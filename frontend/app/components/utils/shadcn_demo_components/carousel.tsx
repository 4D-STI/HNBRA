import * as React from "react"
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"

const ALT_BANNER = 'banner marketing da Marinha do Brasil'

export function CarouselDemo() {
  console.log();
  
  return (
    <Carousel className="container">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div
              className="relative w-[950px] h-[350px]"
            >
              <Image
                src={`/images/banner/${index}/${index}.jpg`}
                alt={ALT_BANNER}
                fill
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
