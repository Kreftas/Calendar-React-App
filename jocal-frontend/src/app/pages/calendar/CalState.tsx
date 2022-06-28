import { useState, createContext, useEffect } from "react"
import { CalState, UpdateCalState } from "../../model/calendar/CalendarModel"
import { getTodaysDate } from "./utility/CalendarUtility"

export const useCalState = (initialState: CalState) => {
    const data = localStorage.getItem("calstate")
    const theState = data ? JSON.parse(data) : initialState
    const [calState, setState] = useState<CalState>(theState)

    const setCalState = (updateState: UpdateCalState) => {
        setState({
            year: updateState.year != undefined ? updateState.year : calState.year,
            month: updateState.month != undefined ? updateState.month : calState.month,
            week: updateState.week != undefined ? updateState.week : calState.week,
            day: updateState.day != undefined ? updateState.day : calState.day,
            mode: updateState.mode != undefined ? updateState.mode : calState.mode,
        })
    }

    return [calState, setCalState] as const
}

export interface ICalStateContext {
    state: CalState
    setState: (updateState: UpdateCalState) => void
}

const initialState: ICalStateContext = {
    state: getTodaysDate(),
    setState: (updateState: UpdateCalState) => {}
}

export const StateContext = createContext<ICalStateContext>(initialState);