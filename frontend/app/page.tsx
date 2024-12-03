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
import { AccordionDemo } from './components/utils/shadcn_demo_components/accordion';
import { CardWithForm } from './components/utils/shadcn_demo_components/card_with_push';


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
      <div id="c-1-container" className="flex h-20 max-w-screen p-2 items-center justify-center mx-auto relative">
        
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


      {/* C2 - banner, botoes atalhos */}
      <div id='c-2-container' className='flex w-full h-96'>
        
        {/* container - banner carousel */}
        <div id='carousel-container' className='flex items-center w-1/2 h-full'>
          <CarouselDemo/>
        </div>

        {/* container - botões atalhos */}
        <div id='files-container' className='grid grid-cols-3  w-1/2 content-stretch p-4'>
          {Array.from({length:9}).map((_, index) => (
            <Button key={index} className='flex items-start bg-blue-200 hover:bg-blue-300 h-34 border-2 border-blue-800 rounded-3xl m-2'>
              <span className='font-bold text-black text-base'>
                Botão lindo {index+1}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* C3 - praça padrão, anuncios */}
      <div id='c-3-container' className='flex flex-col flex-grow flex-shrink w-full h-2/6'>

        <div id='c-3-content-container' className='flex h-full'>
          {/* praça padrão */}
          <div id="praca-padrao" className="w-4/12 ml-8">
            <span>
              Praça padrão
            </span>

            <CardWithForm/>
          </div>

          {/* anuncios multimidia */}
          <div id="anuncios-multimidia" className="w-4/12">
            Anuncios Multimidia
            <CardWithForm/>
            
          </div>

          {/* anuncios textos*/}
          <div id="anuncios-texto" className="flex-col items-center w-4/12">
            <AccordionDemo/>
          </div>
        </div>



      </div>
    </>
     
  );
}
