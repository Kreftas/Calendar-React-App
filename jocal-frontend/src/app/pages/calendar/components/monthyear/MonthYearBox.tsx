import React, { useContext } from 'react'
import { CalMode, Months } from '../../../../model/calendar/CalendarModel'
import { CN, CS } from '../../../../style/ClassNames'
import { StateContext } from '../../CalState'


interface IMonthYearBox {
    index: number
    currentMode: string;
}

export const MonthYearBox = ({ index,currentMode}: IMonthYearBox) => {
    const stateContext = useContext(StateContext)

    const onClick = () => {
        stateContext.setState({
            mode: CalMode.MONTH,
            month: index
        })
    }

    return (
        <div className={CS(CN.BOX_CAL, CN.CLICKABLE, currentMode, CN.CONTENTBOX) } onClick={onClick}>
            {Object.values(Months).at(index)}
        </div>
    )
}
