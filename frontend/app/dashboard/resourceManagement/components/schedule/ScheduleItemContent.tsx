'use client'

import { useEffect, useState } from 'react';
import ScheduleItemTable from './ScheduleItemTable';
import { IScheduleItem } from '../../../../contracts/IScheduleInterface'

interface IscheduleItemContent {
    data: IScheduleItem[]
}

const ScheduleItemContent = ({data}: IscheduleItemContent) => {
    const [token, setToken] = useState('')
    const scheduleData = [...data]   

    useEffect(() => {
        const token = localStorage?.getItem('token') ?? ''
        
        if (token) setToken(token)
    }, [])
    
    return (
        // container da tabela
        <table id='table-main-container' className="table-fixed w-full bg-white/60">
            
            <thead>
                <tr className="bg-gray-100 text-wrap text-center text-sm">
                    {token && 
                        <th className="px-4 py-2 w-[60px] text-xs">Editar/Excluir</th>
                    }
                    <th
                        onClick={(e) => console.log('quer filtar: ', e.currentTarget.innerText)}
                        className="px-4 py-2 w-[150px] text-nowrap">Data</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[100px] ">Horário</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[100px] ">Responsável</th>
                    {/* <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[70px] ">NIP</th> */}
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[60px] ">Ramal</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[100px] ">Data de criação</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[200px] ">Tema</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[200px] ">Descrição</th>
                </tr>
            </thead>
            
            <tbody className='w-full'>
                
                {
                    scheduleData.map((item, index) => (
                        <ScheduleItemTable key={index} item={item}/>
                    ))
                }
            </tbody>
        </table>
    );
};

export default ScheduleItemContent;
