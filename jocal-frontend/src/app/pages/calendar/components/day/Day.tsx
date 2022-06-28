import { useContext, useRef, useState } from "react"
import { ICal, Weekdays } from "../../../../model/calendar/CalendarModel"
import { CN } from "../../../../style/ClassNames"
import { StateContext } from "../../CalState"
import { CalMould } from "../../moulds/calmould/CalMould"
import { getDayInWeek } from "../../utility/CalendarUtility"
import { HourBox } from "../hourbox/HourBox"
import { DayBox } from "./DayBox"



interface IDay extends ICal { }

export const Day = () => {
    const [isSyncingLeftScroll, setSyncingLeftScroll] = useState(false)
    const [isSyncingRightScroll, setSyncingRightScroll] = useState(false)
    const rightRef: any = useRef(null)
    const leftRef: any = useRef(null)
    
    const calendarRefs = useRef<Array<HTMLDivElement>>([])


    const stateContext = useContext(StateContext)

    const handleClick = () => {
        console.log("DAAAY")
    }

    const RenderDayBox = (index: number, row: number) => {
        return (
            <DayBox
                calRefs={calendarRefs}
                handleClick={handleClick}
                index={index}
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
    const texts = [Object.values(Weekdays)[getDayInWeek(stateContext.state.year, stateContext.state.month, stateContext.state.day)].toString() + " " + stateContext.state.day] 

    return (
        <CalMould
            renderContentBox={RenderDayBox}
            rows={1}
            columns={texts.length}
            text={texts}
            renderSideBox={RenderHourBox}
            renderColumnBar={true}
        />
    )
}
