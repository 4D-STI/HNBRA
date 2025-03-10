import Head from 'next/head'
import {ScheduleManagement} from '../schedule/ScheduleManagement'
import {ScheduleProvider} from '@/app/context/ScheduleContext'

export default function RegisterPage() {
  
  return (
    
    <>
      <Head><title>Agendamento de Salas</title></Head>
      
      <div 
      id="dashboard-main-container"
      className="flex flex-row flex-grow w-screen"
      >
          
          {/* conteudo que será gerenciado */}
          <div
            id='content-main-container'
            className='flex flex-col w-full p-2 h-[700px] mx-20'
          >
              <div
                id='content-main-title-container'
                className="text-black font-bold text-xl mb-2"
              >
                { 'gestão de agendamento'.toUpperCase()  }
              </div>
              
            <div
              id='content-container'
              className={`flex flex-col bg-blue-900 rounded-3xl h-full items-center`}
            >

              {/* conteudo */}
              <div className='h-full w-full p-3'>
                <ScheduleProvider>
                  <ScheduleManagement/>
                </ScheduleProvider>
              </div>
            </div>
          </div>

        </div>
    </>
  )
}
