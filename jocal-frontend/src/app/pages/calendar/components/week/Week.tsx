import { useContext, useEffect, useRef, useState } from "react"
import { Weekdays, ICal } from "../../../../model/calendar/CalendarModel"
import { StateContext } from "../../CalState"
import { CalMould } from "../../moulds/calmould/CalMould"
import { HourBox } from "../hourbox/HourBox"
import { getWeekDates, setCurrentWeekDay } from "../../utility/CalendarUtility"
import { WeekBox } from "./WeekBox"

export const Week = () => {
    const [isSyncingLeftScroll, setSyncingLeftScroll] = useState(false)
    const [isSyncingRightScroll, setSyncingRightScroll] = useState(false)
    const rightRef: any = useRef(null)
    const leftRef: any = useRef(null)
    const calendarRefs = useRef<Array<HTMLDivElement>>([])
    const stateContext = useContext(StateContext)
    // TODO useMemo FOR THIS CALC? IS PROB EXPENSIVE
    const weekDates = getWeekDates(stateContext.state.year, stateContext.state.month, stateContext.state.week)

    const RenderWeekBox = (index: number) => {
        return (
            <WeekBox
                calRefs={calendarRefs}
                index={index}
                weekDate={weekDates[index]}
                currentMode={setCurrentWeekDay(stateContext.state, weekDates[index].day)}
                isSyncingLeftScroll={isSyncingLeftScroll}
                leftRef={leftRef}
                rightRef={rightRef}
                setSyncingLeftScroll={setSyncingLeftScroll}
                setSyncingRightScroll={setSyncingRightScroll}
            />
        )
    }

    const RenderHourBox = (index: number) => {
        return (
            <HourBox
                calRefs={calendarRefs}
                isSyncingRightScroll={isSyncingRightScroll}
                leftRef={leftRef}
                rightRef={rightRef}
                setSyncingLeftScroll={setSyncingLeftScroll}
                setSyncingRightScroll={setSyncingRightScroll}
            />
        )
    }

    const texts = Object.values(Weekdays)
    let labels = [] 
    for(let i = 0; i < texts.length; i++) {
        labels.push(texts[i] + " " + weekDates[i].day)
    }
    
    return (
        <CalMould
            renderContentBox={RenderWeekBox}
            rows={1}
            columns={texts.length}
            text={labels}
            renderSideBox={RenderHourBox}
            renderColumnBar={true}
        />
    )
}
