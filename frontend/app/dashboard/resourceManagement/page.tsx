'use client'

// import { Separator } from "@/components/ui/separator"
import React, {useState} from 'react'
import {ContentManagement} from './components/content/ContentManagement'
import {FilesManagement} from './components/files/FilesManagement'
import {ScheduleManagement} from './components/schedule/ScheduleManagement'
import {UsersManagement} from './components/users/UserManagement'


export default function RegisterPage() {
  // gerencia o titulo e o conteudo
  const  [ mainContentTittle, setMainContentTittle ] = useState('')
  const [content, setContent] = useState('')
  const [contentContainerBgColor, setContentContainerBgColor] = useState('bg-gray-400')
  
  // função para alterar cor de fundo dinamicamente
  const handleClickToSetBgColorInContentContainer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement
    const bgColor = target.dataset.bg
  
    if (bgColor) {
      setContentContainerBgColor(bgColor)
    } else {
      setContentContainerBgColor('bg-gray-400')
    }
  }
  // função para alterar o conteúdo que será gerenciado
  const handleClickToSetContent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement
    const value = target.value

    if (value) {
      setContent(value)
    } else {
      setContent('')
    }
  }
  
  return (
      
      <div 
        id="dashboard-main-container"
        className="flex flex-row flex-grow w-screen p-2"
      >
        {/* botoões de escolha do que será gerenciado */}
        <div
          id="buttons-container"
          className="flex flex-col gap-y-4 w-1/4 items-center justify-center"
        >

          {/* <div
            className="flex bg-red-200 rounded-xl justify-center items-center"
            >
            <button
              className='h-24 w-52 hover:text-lg hover:text-blue-600 font-bold'
              onClick={(e) => (
                setMainContentTittle('arquivos'), handleClickToSetBgColorInContentContainer(e),
                handleClickToSetContent(e)
              )}
              value={'arquivos'}
              data-bg='bg-red-200'
            >
              {'arquivos'.toUpperCase()}
            </button>
          </div>

          <div
            className="flex bg-green-200 rounded-xl justify-center items-center"
          >
            <button
              className='h-24 w-52 hover:text-lg hover:text-blue-600 font-bold'
              onClick={(e) => (
                setMainContentTittle('usuários'), handleClickToSetBgColorInContentContainer(e),
                handleClickToSetContent(e)
              )}
              value={'usuarios'}
              data-bg='bg-green-200'
            >
              {'usuários'.toLocaleUpperCase()}
            </button>
          </div>

          <div
            className="flex bg-blue-200 rounded-xl justify-center items-center"
            >
            <button
              className='h-24 w-52 hover:text-lg hover:text-blue-600 font-bold'
              onClick={(e) => (
                setMainContentTittle('conteúdo'), handleClickToSetBgColorInContentContainer(e),
                handleClickToSetContent(e)
              )}
              value={'conteudo'}
              data-bg='bg-blue-200'
            >
              {'conteúdo'.toUpperCase()}
            </button>
          </div> */}

          <div
            className="flex bg-purple-300 rounded-xl justify-center items-center"
            >
            <button
              className='h-24 w-52 hover:text-lg hover:text-blue-600 font-bold'
              onClick={(e) => (
                setMainContentTittle('agendamento'), handleClickToSetBgColorInContentContainer(e),
                handleClickToSetContent(e)
              )}
              value={'agendamento'}
              data-bg='bg-purple-300'
            >
              {'agendamento'.toUpperCase()}
            </button>
          </div>

        </div>
        
        
        {/* conteudo que será gerenciado */}
        <div
          id='content-main-container'
          className='flex flex-col w-3/4 p-2 h-[700px]'
        >
            <div
              id='content-main-title-container'
              className="text-black font-bold text-xl mb-2"
            >
              { !mainContentTittle && 'gestão de recursos'.toUpperCase()  }
              { mainContentTittle && `gestão de ${mainContentTittle}`.toUpperCase() }
            </div>
            
          <div
            id='content-container'
            className={`flex flex-col ${contentContainerBgColor} rounded-3xl h-full items-center`}
          >
            {/* mensagem de instrução */}
            {!mainContentTittle && 
              <div
                id='content-sub-title-container'
                className="flex flex-col gap-4 text-white font-bold text-xl mt-2"
              >
                {'<<< Clique ao lado para escolher o recurso a ser gerenciado'.toUpperCase()}
              </div>
            }

            {/* conteudo */}
            <div className='h-full w-full p-3'>
              { (content === 'arquivos') && <FilesManagement/> }
              { (content === 'usuarios') && <UsersManagement/> }
              { (content === 'conteudo') && <ContentManagement/> }
              { (content === 'agendamento') && <ScheduleManagement/> }
            </div>
          </div>
        </div>

      </div>
  )
}
