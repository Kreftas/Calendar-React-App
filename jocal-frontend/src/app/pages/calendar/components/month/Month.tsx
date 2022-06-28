import { Weekdays } from "../../../../model/calendar/CalendarModel"
import { CalMould } from "../../moulds/calmould/CalMould"
import { MonthBox } from "./MonthBox"
import { useContext, useEffect, useState } from "react"
import { getDaysInAMonth, getFirstWeekMonth, getStartDayInMonth, incWeek, setCurrentMonthDay, setCurrentWeek } from "../../utility/CalendarUtility"
import { WeekSideBox } from "./WeekSideBox"
import { StateContext } from "../../CalState"
import { selectSpecialsMonth } from "../../../../api/SpecialApi"
import { selectEventsMonth } from "../../../../api/EventApi"
import { ISpecial, NullSpecial } from "../../../../model/special/SpecialModel"
import { IEvent, NullEvent } from "../../../../model/event/EventModel"


export const Month = () => {
    const stateContext = useContext(StateContext)
    const startWeek = getFirstWeekMonth(stateContext.state.year, stateContext.state.month)
    const startDay = getStartDayInMonth(stateContext.state.year, stateContext.state.month)
    const weekDays = Object.values(Weekdays)

    const [specialList, setSpecialList] = useState<[ISpecial]>([NullSpecial])
    const [eventList, setEventList] = useState<[IEvent]>([NullEvent])

    useEffect(() => {
        selectSpecialsMonth({ setList: setSpecialList, month: stateContext.state.month + 1 })
        selectEventsMonth({ setList: setEventList, month: stateContext.state.month + 1, year: stateContext.state.year })
    }, [stateContext])


    const RenderMonthBox = (index: number, row: number) => {
        return (
            <MonthBox
                eventList={eventList}
                specialList={specialList}
                index={index}
                daysInMonth={getDaysInAMonth(stateContext.state.year, stateContext.state.month)}
                startDay={startDay}
                week={incWeek(startWeek, row)}
                currentMode={setCurrentMonthDay(stateContext.state, index - startDay + 1)}
            />
        )
    }

    const RenderWeekBox = (index: number) => {
        return (
            <WeekSideBox
                index={index}
                startWeek={startWeek}
                currentMode={setCurrentWeek(stateContext.state, startWeek + index)}
            />
        )
    }

    return (
        <CalMould
            rows={6}
            columns={7}
            text={weekDays}
            renderContentBox={RenderMonthBox}
            renderSideBox={RenderWeekBox}
            renderColumnBar={true}
        />
    )
}




