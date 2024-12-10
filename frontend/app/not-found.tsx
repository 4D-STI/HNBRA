'use client'

import Link from 'next/link'
import Lottie from 'lottie-react'
import Sailor_404 from '@/public/animations/lottie/404/404_sailor.json'

export default function NotFound() {
  return (
    <div 
        id='not-found-main-container'
        className='flex flex-col items-center align-center h-screen text-white bg-sky-700'
    >
      
      <h2
        id='404-text'
        className='text-3xl mt-20'
      >
        404 - NADA A ESTIBORDO
      </h2>
      
      <div id='animation-container'>
        <Lottie
          animationData={Sailor_404}
          loop={true}
        />

      </div>

      <Link href="/">Retornar</Link>
    </div>
  )
}
