'use client'

// import Link from 'next/link'
// icone
import { Grip } from 'lucide-react';
// shadcn: navigation-menu
import {NavigationMenuDemo} from '@/app/components/utils/shadcn_demo_components/navigation-menu'
import { CarouselDemo } from './components/utils/shadcn_demo_components/carousel';
// react
import { CardWithForm } from './components/utils/shadcn_demo_components/card_with_push';
import ShortcutsOtherApps from '@/app/components/shortcuts/ShortcutsOtherApps'
import Link from 'next/link';


export default function Home() {
  
  return (
    
    <>

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

        <div id="container-userManager-link" className="py-2 px-8 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
        <Link href="/dashboard/userManager">
          <p>Gerenciamento de Usuários</p>
        </Link>
      </div>

      <div id="container-userManager-link" className="py-2 px-8 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
        <Link href="/dashboard/filesManagement">
          <p>Gerenciamento de Arquivos</p>
        </Link>
      </div>

      </div>


      {/* C2 - banner, botoes atalhos */}
      <div id='c-2-container' className='flex flex-row h-96 mt-2 items-center'>
        
        {/* container - botões atalhos */}
        <div id='files-container' className='grid grid-cols-9  w-1/2 content-stretch px-8 ml-8'>
          <ShortcutsOtherApps/>
        </div>

        {/* container - banner carousel */}
        <div id='carousel-container' className='flex flex-row w-1/2 rounded-xl container mx-auto '>
          <CarouselDemo/>
        </div>
      </div>

      {/* C3 - praça padrão, anuncios */}
      <div id='c-3-container' className='flex flex-col flex-grow flex-shrink w-full h-2/6 mt-4'>

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
            Anuncios de textos
          </div>
        </div>



      </div>
    </>
     
  );
}
