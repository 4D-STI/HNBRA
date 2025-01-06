// import Image from "next/image";
import { Grip } from 'lucide-react';
// shadcn: navigation-menu
// import { NavigationMenuDemo } from '@/app/components/utils/shadcn_demo_components/navigation-menu'
import { CarouselDemo } from './components/utils/shadcn_demo_components/carousel';
// react
import { CardForAdvertisement } from './components/utils/shadcn_demo_components/card_with_ad';
import { CardForAdvertisementWithoutLink } from './components/utils/shadcn_demo_components/card_with_ad_without_link';
import { CardWithMultiMedia } from './components/utils/shadcn_demo_components/card_with_multimedia';
import { CardWithHighlights } from './components/utils/shadcn_demo_components/card_with_highlights';
// data
import {pracaPadrao,servidorCivilPadrao} from '@/app/components/utils/shadcn_demo_components/data/card_with_highlights_data'

import ShortcutsOtherApps from '@/app/components/shortcuts/ShortcutsOtherApps'

export default function Home() {

  const anuncio1 = "Para suporte de TI, abra chamado via SisCSRECIM"
  const anuncio2 = "Limite para emissão de empenhos: 30DEZ2024"
  const anuncio3 = "O Arnault será descontinuado até 31DEZ2024"

  return (

    <>

      {/* C1 - acesso rápido | bono do dia (geral, sede) | clinicas credenciadas | plano do dia | cardapio */}
      <div id="c-1-container" className="flex h-10 mt-2 max-w-screen items-center justify-center mx-auto relative bg-red-100">

        <div id="container-shortcut-button" className="flex px-8 py-2 ml-12 items-center hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer absolute left-0">

          <div id="container-shortcut-icon" className="mr-4">
            <Grip />
          </div>

          <div id="shortcut-title">
            <p className='truncate'>Acesso rápido</p>
          </div>
        </div>

        {/* <NavigationMenuDemo /> */}

        {/* <div id="container-userManager-link" className="py-2 px-8 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
          <Link href="/dashboard/userManager">
            <p>Gerenciamento de Usuários</p>
          </Link>
        </div>

        <div id="container-userManager-link" className="py-2 px-8 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
          <Link href="/dashboard/filesManagement">
            <p>Gerenciamento de Arquivos</p>
          </Link>
        </div> */}

      </div>


      {/* C2 - banner, botoes atalhos */}
      <div id='c-2-container' className='flex flex-row h-96 items-center'>

        {/* container - botões atalhos */}
        <div id='files-container' className='grid grid-cols-9  w-1/2 content-stretch px-8 ml-8'>
          <ShortcutsOtherApps />
        </div>

        {/* container - banner carousel */}
        <div id='carousel-container' className='flex flex-row w-1/2 rounded-xl container mx-auto '>
          <CarouselDemo />
        </div>
      </div>

      {/* C3 - praça padrão, anuncios */}
      <div id='c-3-container' className='flex flex-col flex-grow flex-shrink w-full h-auto'>

        <div id='c-3-content-container' className='flex h-full'>

          {/* praças e servidor civil padrão */}
          <div id="anuncios-multimidia" className="w-6/12 px-6">

            <div id="multimedia-title-container" className='mb-2 font-bold'>
              Praças e Servidor Civil Padrão
            </div>

            <div id="multimedia-content-container" className="flex flex-row gap-4">
              {/* praça */}
              {pracaPadrao?.map((praca, i) => {
                return <CardWithHighlights key={i} pracaPadrao={praca}/>
              })}

              {/* servidor civil padrão */}
              {servidorCivilPadrao?.map((servidor, i) => {
                return <CardWithHighlights key={i} servidorCivilPadrao={servidor} />
              })}
            </div>

          </div>
          {/* anuncios multimidia */}
          <div id="anuncios-multimidia" className="w-4/12 px-6">
            
            <div id="multimedia-title-container" className='mb-2 font-bold'>
              Anuncios Multimidia
            </div>

            <div id="multimedia-content-container" className="">
              {/* todo: fazer carrosel */}
              <CardWithMultiMedia/>
            </div>

          </div>

          {/* anuncios textos*/}
          <div id="anuncios-texto" className="flex-col w-4/12 px-6">
            
            <div id="advertisement-title-container" className="mb-2 font-bold">
              <h1>Anúncios</h1>
            </div>

            <div id="anuncio-texto-container" className="flex flex-col gap-1">
              
              <CardForAdvertisement session='TI' content={anuncio1} link='https://siscsrecim.ctim.mb'/>

              <CardForAdvertisementWithoutLink session='Administração' content={anuncio2}/>
              
              <CardForAdvertisementWithoutLink session='Saúde' content={anuncio3}/>
            </div>
            
          </div >
        </div >



      </div >
    </>

  );
}
