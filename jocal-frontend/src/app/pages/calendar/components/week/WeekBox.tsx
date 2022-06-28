import { useContext, useEffect, useState } from "react";
import { selectEventsDay } from "../../../../api/EventApi";
import { selectSpecialsDay } from "../../../../api/SpecialApi";
import { CalMode } from "../../../../model/calendar/CalendarModel";
import { CN, CS } from "../../../../style/ClassNames";
import { StateContext } from "../../CalState";
import { EventBox } from "../hourbox/EventBox";
import { PopupBox } from "../hourbox/Popupbox";
import { WeekEventDecore } from "../hourbox/EventDecore";
import { SpecialDecore } from "../hourbox/SpecialDecore";
import { ISpecial, NullSpecial } from "../../../../model/special/SpecialModel";
import { IEvent, NullEvent } from "../../../../model/event/EventModel";

export interface IWeekDate {
    year: number,
    month: number,
    day: number
}

interface IWeekBox {
    index: number;
    weekDate: IWeekDate
    currentMode: string;

}

interface IHourBox {
    rightRef: any,
    leftRef: any,
    calRefs: any,
    isSyncingLeftScroll: boolean,
    setSyncingRightScroll: (isSyncingRightScroll: boolean) => void,
    setSyncingLeftScroll: (isSyncingLeftScroll: boolean) => void
}

export const WeekBox = ({ weekDate, index, calRefs, currentMode, isSyncingLeftScroll, rightRef, setSyncingLeftScroll, setSyncingRightScroll }: IWeekBox & IHourBox) => {
    const stateContext = useContext(StateContext)
    const [specialList, setSpecialList] = useState<[ISpecial]>([NullSpecial])
    const [eventList, setEventList] = useState<[IEvent]>([NullEvent])

    useEffect(() => {
        selectSpecialsDay({ setList: setSpecialList, month: weekDate.month + 1, day: weekDate.day })
        selectEventsDay({ setList: setEventList, day: weekDate.day, month: weekDate.month + 1, year: weekDate.year })

    }, [stateContext])


    const PartBoxes = () => {
        const boxes = []
        for (let i = 0; i < 24; i++) {
            boxes.push(<EventBox eventList={eventList} i={i} key={i} day={weekDate.day} month={weekDate.month} year={weekDate.year} />)
        }
        return (
            <>
                {boxes}
            </>
        )
    }

    const handleClick = (e: any) => {
        stateContext.setState({
            mode: CalMode.DAY,
            day: weekDate.day,
            year: weekDate.year,
            month: weekDate.month
        })
    }

    const leftScroll = () => {
        const ref = calRefs.current[index]
        rightRef.current.scrollTop = ref ? ref.scrollTop : 0;
        for (let i = 0; i < 7; i++) {
            if (i != index) {
                calRefs.current[i].scrollTop = ref ? ref.scrollTop : 0;
            }
        }
    }

    return (
        <div className={CS(CN.BOX_CAL, currentMode, CN.CONTENTBOX, CN.HOUR_BOX, CN.LIGHT_HOVERABLE)} onClick={(e) => handleClick(e)} >
            <div className={CS(CN.HOUR_TOP)}>
                <WeekEventDecore eventList={eventList} />
                <SpecialDecore specialList={specialList} />
                <PopupBox eventList={eventList} specialList={specialList}/>
            </div>
            <div className={CN.HOUR_PARTBOX} ref={el => calRefs.current[index] = el} onScroll={leftScroll}>
                <PartBoxes />
            </div>

        </div>
    )
}