import { useContext } from 'react'
import { CalMode } from '../../../../model/calendar/CalendarModel'
import { CN, CS } from '../../../../style/ClassNames'
import { StateContext } from '../../CalState'
import { getMonthFromWeek } from '../../utility/CalendarUtility'

interface IWeekYearBox {
    index: number
    currentMode: string;
}

export const WeekYearBox = ({ index, currentMode }: IWeekYearBox) => {
    const stateContext = useContext(StateContext)

    const onClick = () => {
        stateContext.setState({
            mode: CalMode.WEEK,
            week: index + 1,
            month: getMonthFromWeek(index + 1)
        })
    }

    return (
        <div className={CS(CN.BOX_CAL, CN.CLICKABLE, currentMode, CN.CONTENTBOX)} onClick={onClick}>
            {index + 1}
        </div>
    )
}
