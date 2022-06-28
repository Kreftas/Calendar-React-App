export interface IEvent {
    id: number
    description: string
    datestart: string
    timestart: string | null
    timeend: string | null
    color: number
}



export const NullEvent: IEvent = { datestart: "", description: "", id: -1, timeend: null, timestart: null, color: 2 }