'use client'

// import Link from 'next/link'
// icone
import { Grip } from 'lucide-react';
// shadcn: navigation-menu
import {NavigationMenuDemo} from '@/app/components/utils/shadcn_demo_components/navigation-menu'
import { CarouselDemo } from './components/utils/shadcn_demo_components/carousel';
import {Button} from '@/components/ui/button'
// react
import { useState } from 'react';
import Image from 'next/image'
// assets
import Fragatas from '@/public/images/2_fragatas_navegando.jpg'
import SupportSvg from '@/public/images/support_img_svg.svg'


export default function Home() {
  
  const [isOpen, setIsOpen] = useState(true)
  
  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
    
  }


  return (
    
    <>

      {/* <Image
        alt='imagem de fundo de 2 fragatas manobrando'
        src={Fragatas}
        // fill={true}
        objectFit='cover'
        className=''
      /> */}

      {/* C1 - atalhos, navegação, suporte */}
      <div id="container-buttons-pages" className="flex max-w-screen p-2 items-center justify-center mx-auto relative">
        
        <div id="container-shortcut-button" className="flex px-8 py-2 ml-32 items-center hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer absolute left-0">

          <div id="container-shortcut-icon" className="mr-4">
              <Grip/>
          </div>

          <div id="shortcut-title">
            <p className='truncate'>Acesso rápido</p>
          </div>
        </div>

        <NavigationMenuDemo/>

      </div>


      <div className='flex '>
        
        <div id='carousel-container' className=''>
          {/* C2 - Banner carrosel, botões atalhos*/}
          <CarouselDemo/>
        </div>

        <div id='shortcut-container' className='ml-20 content-center'>
        </div>
      </div>
    </>
     
  );
}
