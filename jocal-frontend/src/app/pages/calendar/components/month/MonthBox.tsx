import { useContext } from "react";
import { CalMode } from "../../../../model/calendar/CalendarModel";
import { CN, CS } from "../../../../style/ClassNames"
import { StateContext } from "../../CalState";
import {  MonthEventDecore } from "../hourbox/EventDecore";
import { MonthSpecialDecore } from "../hourbox/SpecialDecore";
import { MonthPopupBox, PopupBox } from "../hourbox/Popupbox";
import { ISpecial } from "../../../../model/special/SpecialModel";
import { IEvent } from "../../../../model/event/EventModel";

interface IMonthBox {
    index: number;
    daysInMonth: number;
    startDay: number;
    week: number;
    currentMode: string;
    specialList: [ISpecial];
    eventList: Array<IEvent>;
}

export const MonthBox = ({ specialList, daysInMonth, index, startDay, week, currentMode, eventList }: IMonthBox) => {
    const stateContext = useContext(StateContext)
    const day = index - startDay + 1

    const onClick = () => {
        stateContext.setState({
            day: day,
            mode: CalMode.DAY,
            week: week
        })
    }

    if (startDay <= index && index < daysInMonth + startDay) {
        return (
            <div className={CS(CN.BOX_CAL, CN.CLICKABLE, currentMode, CN.CONTENTBOX,  CN.MONTHBOX)} onClick={onClick}>
                {day}
                <MonthEventDecore eventList={eventList} day={day} />
                <MonthSpecialDecore specialList={specialList} day={day} />
                <MonthPopupBox eventList={eventList} specialList={specialList} day={day} row={Math.floor(index / 7)} />
            </div>
        )
    } else {
        return (
            <div className={CS(CN.BOX_CAL, CN.FILL)}></div>
        )
    }
}