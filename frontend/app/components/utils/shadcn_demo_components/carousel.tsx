import * as React from "react"
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"
// import Banner_20_portas_edited from '@/public/images/banner/0/banner_20_portas_edited.png'
// import Banner_novembro_azul from '@/public/images/banner/1/banner_novembro_azul.jpg'
import Banner_novembro_azul from '@/public/images/banner/2/banner_novembro_azul_edited.png'

const ALT_1_BANNER = 'Banner da marinha do brasil. 20 portas de entradas para a marinha'

export function CarouselDemo() {
  return (
    <Carousel className="container mx-auto px-24">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src={Banner_novembro_azul}
              alt={ALT_1_BANNER}
              width={864}
              className="rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
