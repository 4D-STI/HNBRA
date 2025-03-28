import { IScheduleItem, OrderType, ScheduleType } from '../../../../../contracts/IScheduleInterface'

export interface IScheduleFilterParams {
    data: IScheduleItem[],
    order?: OrderType
    scheduleType?: ScheduleType | null
    param_for_filter?: keyof IScheduleItem,
    search_term?: string,
}

// FILTROS DE ORDENAÇÃO

// centraliza fluxo dos filtros (preparado para facade pattern)
export const filteredData = ({ data, order, scheduleType, param_for_filter }: IScheduleFilterParams) => {
    // filtra por tipo
    const dataByType = typeScheduleFilter({ data, scheduleType })
    if (false) console.log(order, param_for_filter);

    // filtra por parametro

    return dataByType
}

// Ordena por data de inicio do agendamento
export const dateScheduleStartOrdering = ({ data, order }: IScheduleFilterParams) => {
    console.log('entrou');
    // crescente
    if (order === 'asc') return data.sort((a, b) => a.schedulingStart.getTime() - b.schedulingStart.getTime())
    // decrescente
    if (order === 'des') return data.sort((a, b) => b.schedulingStart.getTime() - a.schedulingStart.getTime())
}

// Ordena por data de finalização do agendamento
export const dateScheduleEndtOrdering = ({ data, order }: IScheduleFilterParams) => {
    // crescente
    if (order === 'asc') return data.sort((a, b) => a.schedulingEnd.getTime() - b.schedulingEnd.getTime())
    // decrescente
    if (order === 'des') return data.sort((a, b) => b.schedulingEnd.getTime() - a.schedulingEnd.getTime())
}

// Ordena por data de criação do agendamento
export const dateCreateScheduleOrdering = ({ data, order }: IScheduleFilterParams) => {
    // crescente
    if (order === 'asc') return data.sort((a, b) => a.schedulingStart.getTime() - b.schedulingStart.getTime())
    // decrescente
    if (order === 'des') return data.sort((a, b) => b.schedulingStart.getTime() - a.schedulingStart.getTime())
}

// FILTROS DE COMPARAÇÃO

// filtra por local
export const typeScheduleFilter = ({ data, scheduleType }: IScheduleFilterParams): IScheduleItem[] => {
    console.log('tipo do filtro : ', scheduleType);

    const dataToFilter = [...data]

    // retorna agendamentos do auditorio
    if (scheduleType === ScheduleType.auditorium) return dataToFilter.filter((item: IScheduleItem) => item.typeScheduling === ScheduleType.auditorium)
    // retorna agendamentos da sala de reuniões
    if (scheduleType === ScheduleType.meeting_room) return dataToFilter.filter((item: IScheduleItem) => item.typeScheduling === ScheduleType.meeting_room)
    // retorna todos os agendamentos quando o tipo não for específicado
    return data
}

// // filtra por nip
// export const nipScheduleFilter = ({ data, param_for_filter }: IScheduleFilterParams) => data.filter(item => item.nip === param_for_filter?.nip)

// // filtra por dia de inicio
// export const startDayScheduleFilter = ({ data, param_for_filter }: IScheduleFilterParams) => data.filter(item => item.schedulingStart.getDay() === param_for_filter?.schedulingStart.getDay())

// // filtra por dia de inicio
// export const endDayScheduleFilter = ({ data, param_for_filter }: IScheduleFilterParams) => data.filter(item => item.schedulingEnd.getDay() === param_for_filter?.schedulingEnd.getDay())

// filtra por termo de busca em tema ou descrição
export const searchScheduleThemeDescription = ({ data, search_term }: IScheduleFilterParams) => (
    data.filter(item => {
        const lowerCaseSearchTerm = search_term?.toLocaleLowerCase()
        const lowerCaseTheme = item.theme.toLocaleLowerCase()
        const lowerCaseDescription = item.description.toLocaleLowerCase()

        if (lowerCaseSearchTerm) return (
            lowerCaseTheme.includes(lowerCaseSearchTerm) ||
            lowerCaseDescription.includes(lowerCaseSearchTerm)
        )
    })
)
