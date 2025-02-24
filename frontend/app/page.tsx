"use client";
import { CardForAdvertisementWithoutLink } from './components/utils/shadcn_demo_components/card_with_ad_without_link';
import { CardWithMultiMedia } from './components/utils/shadcn_demo_components/card_with_multimedia';
import { CardWithHighlights } from './components/utils/shadcn_demo_components/card_with_highlights';
import ShortcutsOtherApps from '@/app/components/shortcuts/ShortcutsOtherApps'
// import ShortcutButton from '@/app/components/shortcuts/ShortcutButton'
import BonoGeralButton from './components/shortcuts/BonoGeralButton';
import BonoSedeButton from './components/shortcuts/BonoSedeButton';
import ClinicasCredenciadasButton from './components/shortcuts/ClinicasCredenciadasButton';
import PlanoDoDiaPage from './components/shortcuts/PlanoDoDiaPage';
import CardapioButton from './components/shortcuts/CardapioButton';
import Slidebar from "@/app/components/sidebar/Slidebar";
import Search from "@/app/components/search/Search";
import AddIcon from '@mui/icons-material/Add';

// contexto
import { PDF_DataProvider } from '@/app/context/files_pdf_Context'

// data
import { pracaPadrao, servidorCivilPadrao } from '@/app/components/utils/shadcn_demo_components/data/card_with_highlights_data'
import SwiperCarousel from './components/carousel/carousel_swiper';
import { InformationType } from './types/informationType';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [information, setInformation] = useState<InformationType[]>([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Verifica login
    if (localStorage.getItem('token')) {
      setIsLogin(true);
    }

    // Busca informações da API
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/information`, {
          cache: "no-store",
        });
        const data = await response.json();
        setInformation(data);
      } catch (error) {
        console.error("Erro ao buscar informações:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <PDF_DataProvider>
        <>
          {/* C1 */}
          <div id="c-1-container" className="flex flex-row py-1 max-w-screen items-center space-x-4 bg-blue-200 justify-between">

            <div id='menu-principal-container' className='ml-20'>
              {/* slide bar */}
              <Slidebar />
            </div>

            <div id='nav-button-container' className='flex flex-row'>
              {/* shortcut button */}
              {/* <ShortcutButton/> */}


              {/* bono geral */}
              <BonoGeralButton />

              {/* bono sede */}
              <BonoSedeButton />

              {/* clinicas credenciadas */}
              <ClinicasCredenciadasButton />

              {/* plano do dia */}
              <PlanoDoDiaPage />

              {/* cardapio */}
              <CardapioButton />
            </div>

            <div id="busca-container" className=''>
              {/* busca */}
              <Search />
            </div>

          </div>


          {/* C2 - banner, botoes atalhos */}
          <div id='c-2-container' className='flex flex-row h-96 items-center'>

            {/* container - botões atalhos */}
            <div id='files-container' className='grid grid-cols-9  w-1/2 content-stretch px-8 ml-8'>
              <ShortcutsOtherApps />
            </div>

            {/* container - banner carousel */}
            <div id='carousel-container' className='flex flex-row w-1/2 h-[350px] rounded-xl container mx-auto mr-6'>
              <SwiperCarousel />
            </div>
          </div>

          {/* C3 - praça padrão, anuncios */}
          <div id='c-3-container' className='flex flex-col flex-grow flex-shrink w-full h-auto'>

            <div id='c-3-content-container' className='flex h-full'>

              {/* praças e servidor civil padrão */}
              <div id="praca-sc-padrao-container" className="w-6/12 px-6">

                <div id="praca-sc-padrao-title-container" className='mb-2 font-bold'>
                  Praças e SC Padrão
                </div>

                <div id="multimedia-content-container" className="flex flex-row gap-4">
                  {/* praça */}
                  {pracaPadrao?.map((praca, i) => {
                    return <CardWithHighlights key={i} pracaPadrao={praca} />
                  })}

                  {/* servidor civil padrão */}
                  {servidorCivilPadrao?.map((servidor, i) => {
                    return <CardWithHighlights key={i} servidorCivilPadrao={servidor} />
                  })}
                </div>

              </div>
              {/* anuncios multimidia */}
              <div id="anuncios-multimidia" className="w-2/12 px-6">

                <div id="multimedia-title-container" className='mb-2 font-bold'>
                  Multimídia
                </div>

                <div id="multimedia-content-container" className="">
                  {/* todo: fazer carrosel */}
                  <CardWithMultiMedia />
                </div>

              </div>

              {/* anuncios textos*/}
              <div id="anuncios-texto" className="flex-col w-4/12 px-6 h-96 overflow-y-scroll">

                <div id="advertisement-title-container" className="mb-2 font-bold flex items-center justify-between">
                  <h1>Informações Gerais</h1>
                  {isLogin && (
                    <Link href={"/dashboard/filesManagement"}>
                      <AddIcon />
                    </Link>
                  )}
                </div>

                <div id="anuncio-texto-container" className="flex flex-col gap-3">

                  <div id="anuncio-texto-container" className="flex flex-col gap-3">
                    {information.map((anuncio, i) => (
                      <CardForAdvertisementWithoutLink key={i} session={anuncio.nameDepartament} content={anuncio.description} />
                    ))}
                  </div>

                </div>

              </div >
            </div >

          </div >
        </>
    </PDF_DataProvider >
  );
}
