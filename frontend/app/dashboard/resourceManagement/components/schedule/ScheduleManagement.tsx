'use client'

import React, { useCallback, useEffect, useState } from "react"
import {CalendarPlus, RefreshCw} from 'lucide-react'
import ScheduleForm from "./ScheduleForm"

const url ='http://localhost:3002/scheduling/schedulingTrue'

interface IScheduleItem {
idScheduling: number;
nip: string;
schedulingStart: Date;
schedulingEnd: Date;
nameResponsible: string;
theme: string;
description: string;
typeScheduling: ScheduleType;
ramal: string;
status: boolean;
createdAt: Date;
updatedAt: Date;
}

enum ScheduleType {
    auditorium = 'Auditório',
    meeting_room = 'Sala de Reuniões'
}

// metodo para formatar data
const handlerDateFormat = (date: Date) => {
    return new Date(date).toLocaleString('pt-br', {day: 'numeric', month:'long', year:'numeric', hour:'numeric', minute:'numeric'})
}

export const ScheduleManagement = () => {
    // gerencia o tipo dos agendamentos listados
    const handleScheduleTypeButtonToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        if (target.value === 'auditorium') {
            setCreateSchedule(false)
            setMeetingRoomSelected(false)
            setAuditoriumSelected(!isAuditoriumSelected)
        }

        if (target.value === 'meeting-room') {
            setCreateSchedule(false)
            setMeetingRoomSelected(!isMeetingRoomSelected)
            setAuditoriumSelected(false)
        }
    }

    // gerencia o conteudo (criar ou listar)
    const handleScheduleContent = () => {
        setCreateSchedule(!createSchedule)
        setAuditoriumSelected(false)
        setMeetingRoomSelected(false)
    }

    // gerencia atualização dos dados
    // const handleReload = () => setReload(!reload)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [data, setData] = useState<IScheduleItem[]>([])
    const [isAuditoriumSelected,setAuditoriumSelected] = useState(false)
    const [isMeetingRoomSelected,setMeetingRoomSelected] = useState(false)
    const [createSchedule, setCreateSchedule] = useState(true)


    const fetchData = useCallback(async () => {
        setReload(true)
        if (!url) {
            setError("Erro: Url inexistente!");
            console.log(error);
            console.log(loading);
            
            setLoading(false);
            return;
        }

        try {
            setTimeout(async () => {
                const res = await fetch(url, { cache: "no-store" });
                if (!res.ok) throw new Error("Erro ao buscar conteúdo.");
                const data = await res.json();
                await setData(data);
                setReload(false)
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, []);

    // Executa a busca ao carregar
    useEffect(() => {
        fetchData();
    },[fetchData]);

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
                            ${isAuditoriumSelected ? "bg-blue-600" : "bg-gray-600"}
                        `}
                        onClick={(e) => handleScheduleTypeButtonToggle(e)}
                        value='auditorium'
                    >
                        Auditório
                    </button>

                    <button
                        className={`
                            rounded-2xl p-2 text-white font-bold text-sm
                            ${isMeetingRoomSelected ? "bg-blue-600" : "bg-gray-600"}
                        `}
                        onClick={(e) => handleScheduleTypeButtonToggle(e)}
                        value='meeting-room'
                    >
                        Sala de Reuniões
                    </button>
                </div>

                {/* botoes direita */}
                <div>
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
                        {isAuditoriumSelected && 'Agendamentos do Auditório'}
                        {isMeetingRoomSelected && 'Agendamentos da Sala de Reuniões'}
                        {createSchedule && 'Formulário de Novo Agendamento'}
                    </div>
                

               {/* LISTA DOS AGENDAMENTOS */}
               {
                (isAuditoriumSelected || isMeetingRoomSelected) &&
                (<div className="overflow-y-auto h-full mt-2 pb-8">
                    {data?.sort((a,b) => b.idScheduling - a.idScheduling).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="mt-4 ml-4 mr-4"
                        >
                            <div
                                key={item.idScheduling}
                                className="ml-4"
                            >
                                <p>id: {item.idScheduling}</p>
                                <p>tipo: {item.typeScheduling}</p>
                                <p>criação: {handlerDateFormat(item.createdAt)}</p>
                                <p>descrição: {item.description}</p>
                                <p>responsavel: {item.nameResponsible}</p>
                                <p>nip: {item.nip}</p>
                                <p>ramal: {item.ramal}</p>
                                <p>inicio do agendamento: {handlerDateFormat(item.schedulingStart)}</p>
                                <p>fim do agendamento: {handlerDateFormat(item.schedulingEnd)}</p>
                            </div>
    
                            <div
                                key={index}
                                className="border-2 border-black mt-4"
                            >
                            </div>
                        </div>
                        )
                    })}

                </div>)
                }

                {/* FORMULARIO DE CRIAÇÃO DE AGENDAMENTO */}
                {
                    createSchedule &&
                    (
                        <div className="overflow-y-auto h-full mt-2 pl-8 pr-20 pb-12">
                            <ScheduleForm/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ScheduleManagement;
