'use client'

interface IHandleScheduleTypeToggle {
    event: React.MouseEvent<HTMLButtonElement>,
    setCreateSchedule: React.Dispatch<React.SetStateAction<boolean>>,
    setContentType: React.Dispatch<React.SetStateAction<ScheduleType | null>>,
    setScheduleType: React.Dispatch<React.SetStateAction<ScheduleType | null>>
}

import React from "react"
import { ScheduleType } from "@/app/contracts/types/ScheduleType"

export const handleScheduleTypeButtonToggle = ({ event, setContentType, setCreateSchedule, setScheduleType }: IHandleScheduleTypeToggle): void => {

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
