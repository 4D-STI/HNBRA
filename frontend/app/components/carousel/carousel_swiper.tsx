'use client'

import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

// data
const banners = [
  {
    img_url: '/images/banner/0/0.jpg',
    alt_text: 'banner sobre segurança da informação',
    aria_label: 'banner sobre segurança da informação',
    data_postagem: '29/01/2025',
    data_modificacao: '',
    status: true
  },
  {
    img_url: '/images/banner/1/1.jpg',
    alt_text: 'banner sobre segurança da informação',
    aria_label: 'banner sobre segurança da informação',
    data_postagem: '15/02/2025',
    data_modificacao: '20/02/2025',
    status: true
  },
  {
    img_url: '/images/banner/2/2.jpg',
    alt_text: 'banner sobre segurança da informação',
    aria_label: 'banner sobre segurança da informação',
    data_postagem: '01/03/2025',
    data_modificacao: '',
    status: true
  },
  {
    img_url: '/images/banner/3/3.jpg',
    alt_text: 'banner sobre segurança da informação',
    aria_label: 'banner sobre segurança da informação',
    agendamento: {
      postagem:'10/03/2025',
      exclusao:'17/03/2025'
    },
    status: false
  },
  {
    img_url: '/images/banner/4/4.jpg',
    alt_text: 'banner sobre segurança da informação',
    aria_label: 'banner sobre segurança da informação',
    data_postagem: '20/03/2025',
    data_modificacao: '',
    status: false
  }
];

interface iData {
  idFile: number,
  idSubSession: number,
  path: string,
  nameFile: string,
  nomeSubSession: string,
  description: string,
  status: boolean,
  createdAt: string,
  updatedAt: string
}

export default function SwiperCarousel() {
  const [data, setData] = useState<iData[] | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const API = process.env.NEXT_PUBLIC_API_BACK
  const BANNERS_ID = '168'

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://hnbra.mb:3002/files/nameSub?idSubSession=${BANNERS_ID}`);
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const json = await response.json();
        setData(json); 
      } catch (err) {
        console.log(err);
        // setError(err);
      } finally {
        // setLoading(false);
      }
    }

    fetchData();
  }, [API]);

  console.log('BANNERS ->', data);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {
          banners.map((baner, index) => {
            if (baner.status) {
              return (
                <SwiperSlide 
                key={index}
                className="bg-primary/10 flex items-center justify-center"
              >
                <div className="text-center">
                  <Image
                    src={baner.img_url}
                    alt={baner.alt_text}
                    fill
                    objectFit='cover'
                    className='rounded-xl'
                  />
                  <h2 className="text-2xl font-bold">Slide 1</h2>
                  <p>This is the first slide content</p>
                </div>
              </SwiperSlide>
              )
            }
          })
        }
        {/* <SwiperSlide className="bg-secondary/10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Slide 2</h2>
            <p>This is the second slide content</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-accent/10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Slide 3</h2>
            <p>This is the third slide content</p>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  )
}
