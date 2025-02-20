'use client'

import React, { useCallback, useEffect, useState } from "react"
import {CalendarPlus, RefreshCw} from 'lucide-react'
import ScheduleForm from "./ScheduleForm"
import ScheduleItemContent from "./ScheduleItemContent"
import { ScheduleType, IScheduleItem, OrderType } from "./schedule_interface/scheduleInterface"
import * as filters from "./utils/filters"

const url ='http://localhost:3002/scheduling'

export const ScheduleManagement = () => {
    // gerencia o tipo dos agendamentos listados
    const handleScheduleTypeButtonToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        if (target.value === ScheduleType.auditorium) {
            setCreateSchedule(false)
            setContentType(target.value)
            setScheduleType(target.value)
        }

        if (target.value === ScheduleType.meeting_room) {
            setCreateSchedule(false)
            setContentType(target.value)
            setScheduleType(target.value)
        }
    }

    // gerencia o conteudo (criar ou listar)
    const handleScheduleContent = () => {
        setCreateSchedule(!createSchedule)
        setContentType(null)
        setScheduleType(null)
    }

    // gerencia ordenação do conteúdo
    const handlerOrder = () => {
        
        if (order === 'asc') {
            setOrder(OrderType.des)
            return
        }
        
        if (order === 'des') {
            setOrder(OrderType.asc)
            return
        }
    }

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [data, setData] = useState<IScheduleItem[]>([])
    const [contentType,setContentType] = useState<ScheduleType | null>(null)
    const [createSchedule, setCreateSchedule] = useState(true)
    const [order, setOrder] = useState(OrderType.asc)
    const [search_term, setSearch_Term] = useState('')
    const [scheduleType, setScheduleType] = useState<ScheduleType | null>(null)
    const [param_for_filter, setParam_For_Filter] = useState<keyof IScheduleItem>('schedulingStart')

    // filtros de processamento dos dados
    const filteredData = filters.filteredData({data, order, param_for_filter, scheduleType, search_term})
    
    const fetchData = useCallback(async () => {
        console.log('entrou no fetchdata');
        
        setReload(true)
        
        if (!url) {
            setError("Erro: Url inexistente!");
            console.log(error);
            console.log(loading);
            console.log(setSearch_Term);
            
            
            setLoading(false);
            return;
        }

        try {
            setTimeout(async () => {
                const res = await fetch(url, { cache: "no-store" });
                if (!res.ok) throw new Error("Erro ao buscar conteúdo.");
                const data = await res.json();
                // setData(filters.filteredData({data, order, param_for_filter, scheduleType, search_term}));
                setData(data);
                setReload(false)
            }, 1000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, []); // estado derivado <<<

    // Executa a busca ao carregar
    useEffect(() => {
        console.log('entrou em effect');
                
        fetchData();
    },[]); // estado derivado <<<

    return (
        <div
            id="schedule-main-container"
            className="flex flex-col  w-full h-full"
        >
            {/* container botões do recurso a ser agendado */}
            <div id="resourse-buttons" className="flex flex-row gap-4 h-auto justify-between">
            {/* botoes esqueda */}
                <div className="flex flex-row gap-2">
                    <button
                        className={`
                            flex gap-2 rounded-2xl p-2 text-white font-bold text-sm items-center
                            ${createSchedule ? "bg-blue-600" : "bg-gray-600"}
                        `}
                        onClick={handleScheduleContent}
                        value='create-schedule'
                    >
                        <CalendarPlus/>
                        Novo Agendamento
                    </button>

                    <button
                        className={`
                            rounded-2xl p-2 text-white font-bold text-sm
                            ${contentType === 'auditorium' ? "bg-blue-600" : "bg-gray-600"}
                        `}
                        onClick={(e) => handleScheduleTypeButtonToggle(e)}
                        value='auditorium'
                    >
                        Auditório
                    </button>

                    <button
                        className={`
                            rounded-2xl p-2 text-white font-bold text-sm
                            ${contentType === 'meeting-room' ? "bg-blue-600" : "bg-gray-600"}
                        `}
                        onClick={(e) => handleScheduleTypeButtonToggle(e)}
                        value='meeting-room'
                    >
                        Sala de Reuniões
                    </button>
                </div>

                {/* botoes direita */}
                <div className="flex flex-row gap-4">
                    {/* ordenação */}
                    <button
                        className="flex flex-row bg-green-500 rounded-2xl 2-auto px-4 items-center"
                        onClick={handlerOrder}
                    >
                        <p className="mr-2">{"Filtro ID: "}</p>
                        <p>{order.toLocaleUpperCase()}</p>
                    </button>

                    {/* atualizar conteúdo */}
                    <button
                        className={`
                            flex gap-2 rounded-2xl p-2 text-white font-bold text-sm
                            ${reload ? "bg-yellow-600" : "bg-gray-600"}
                        `}
                        onClick={fetchData}
                        value='meeting-room'
                    >
                        <RefreshCw/>
                        {reload ? 'Atualizando...' : 'Atualizar'}
                    </button>
                </div>
            </div>

            {/* container do conteúdo dos agendamentos */}
            <div id="schedule-content-container" className="border-2 border-black mt-2 h-full w-full rounded-2xl p-2 overflow-hidden">

                <div
                    id="content-title-container"
                    className="font-bold"
                >
                    {(contentType === 'auditorium') && 'Agendamentos do Auditório'}
                    {(contentType === 'meeting-room') && 'Agendamentos da Sala de Reuniões'}
                    {createSchedule && 'Formulário de Novo Agendamento'}
                </div>
                

                {/* LISTA DOS AGENDAMENTOS */}
                {
                    contentType &&
                    <div className="overflow-y-auto h-full mt-2 pb-8">
                        {
                            <ScheduleItemContent 
                                data={filteredData}
                            />
                        }
                    </div>
                }

                {/* FORMULARIO DE CRIAÇÃO DE AGENDAMENTO */}
                {
                    createSchedule &&
                    (
                        <div className="overflow-y-auto h-full mt-2 pl-8 pr-20 pb-12">
                            <ScheduleForm />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ScheduleManagement;
