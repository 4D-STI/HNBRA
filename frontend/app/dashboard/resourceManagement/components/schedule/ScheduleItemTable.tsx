'use client'

import { useEffect, useState } from 'react'
import {IScheduleItem} from '../../../../contracts/IScheduleInterface'
import {HandleEditDelete} from './HandleEditDelete'
import { jwtDecode } from 'jwt-decode'

interface IScheduleItemComponent {
    item: IScheduleItem,
}

export const ScheduleItemTable = ({item}: IScheduleItemComponent) => {
    const [expandTheme, setExpandTheme] = useState(false)
    const [expandDescription, setExpandDescription] = useState(false)
    const [nipDecoded, setNipDecoded] = useState<IScheduleItem | null>(null)
    const [token, setToken] = useState('')

    useEffect(() => {
        const token = localStorage?.getItem('token') ?? ''
        setToken(token)
        if (token.length !== 0) setNipDecoded(jwtDecode(token))
    }, [])

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 text-xs text-center text-nowrap font-bold">
            

            {/* editar/excluir | condição ter o mesmo nip do agendamento*/}
            {
                token && (
                    <td>
                        {
                            Number(nipDecoded?.nip) === Number(item.nip) && <HandleEditDelete scheduleId={item.idScheduling} token={token}/>
                        }
                    </td>
                )
            }
            
            {/* data do agendamento */}
            <td className="px-4 py-2">
                {
                    `${new Date(item.schedulingStart).toLocaleString('pt-br', {day:'2-digit', timeZone: 'utc'}).toUpperCase()}
                    ${new Date(item.schedulingStart).toLocaleString('pt-br', {month:'short', timeZone: 'utc'}).toUpperCase().replace('.','')}`
                }
            </td>
            {/* horario inicio/fim */}
            <td className="flex flex-row px-4 py-2 justify-center">
                    <td className="bg-green-200 px-2 py-1 rounded-xl mr-2">
                        {new Date(item.schedulingStart).toLocaleString('pt-br', {timeStyle:'short', timeZone: 'utc'})}h
                    </td>
                    <td className="bg-red-200 px-2 py-1 rounded-xl">
                        {new Date(item.schedulingEnd).toLocaleString('pt-br', {timeStyle:'short', timeZone: 'utc'})}h
                    </td>
            </td>
            {/* nome do resposável */}
            <td className="px-4 py-2 text-start">
                {item.nameResponsible}
            </td>
            <td className="px-4 py-2">
                {item.ramal}
            </td>
            {/* data de criação do agendamento */}
            <td className="px-4 py-2">
                {new Date(item.createdAt).toLocaleString('pt-br', {dateStyle:'short'})}
            </td>
            {/* tema do agendamento */}
            <td 
                className={`${expandTheme ? '' : ''} truncate px-4 py-2 text-start w-[200px]`}
                onClick={() => setExpandTheme(!expandTheme)}
                title={item.theme}
            >
                {`${item.theme}`}
            </td>
            {/* descrição do agendamento */}
            <td 
                className={`${expandDescription ? '' : ''} hover:truncate-none hover:text-wrap truncate px-4 py-2 text-start`}
                onClick={() => setExpandDescription(!expandDescription)}
                title={item.description}
            >
                {item.description}
            </td>
        </tr>
    )
}

export default ScheduleItemTable
