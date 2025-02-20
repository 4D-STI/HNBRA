'use client'

import { useState } from 'react'
import {IScheduleItem} from './schedule_interface/scheduleInterface'

interface IScheduleItemComponent {
    item: IScheduleItem,
}

// const handleFilter = () => {

// }

export const ScheduleItemTable = ({item}: IScheduleItemComponent) => {
    const [expandTheme, setExpandTheme] = useState(false)
    const [expandDescription, setExpandDescription] = useState(false)
    
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 text-xs text-center text-nowrap">
            

            {/* data do agendamento */}
            <td className="px-4 py-2">
                {new Date(item.schedulingStart).toLocaleString('pt-br', {day:'2-digit', month:'short'}).toUpperCase()}
            </td>
            {/* horario inicio/fim */}
            <td className="px-4 py-2">
                <div className="flex flex-row items-center">
                    <div className="bg-green-200 px-2 py-1 rounded-xl mr-2">
                        {new Date(item.schedulingStart).toLocaleString('pt-br', {timeStyle:'short'})}h
                    </div>
                    <div className="bg-red-200 px-2 py-1 rounded-xl">
                        {new Date(item.schedulingEnd).toLocaleString('pt-br', {timeStyle:'short'})}h
                    </div>
                </div>
            </td>
            {/* nome do resposável */}
            <td className="px-4 py-2">
                {item.nameResponsible}
            </td>
            {/* nip do usuario responsável */}
            <td className="px-4 py-2">
                {item.nip}
            </td>
            {/* ramal de contato do responsável */}
            <td className="px-4 py-2">
                {item.ramal}
            </td>
            {/* data de criação do agendamento */}
            <td className="px-4 py-2">
                {new Date(item.createdAt).toLocaleString('pt-br', {dateStyle:'short'})}
            </td>
            {/* tema do agendamento */}
            <td 
                className={`${expandTheme ? '' : 'truncate'} px-4 py-2 text-start`}
                onClick={() => setExpandTheme(!expandTheme)}
                title={item.theme}
            >
                {`tipo: ${item.typeScheduling.toUpperCase()} - ${item.theme}`}
            </td>
            {/* descrição do agendamento */}
            <td 
                className={`${expandDescription ? '' : 'truncate'} px-4 py-2 text-start`}
                onClick={() => setExpandDescription(!expandDescription)}
                title={item.description}
            >
                {item.description}
            </td>
        </tr>
    )
}

export default ScheduleItemTable
