import { useContext } from "react"
import { CalMode } from "../../../../model/calendar/CalendarModel"
import { CN, CS } from "../../../../style/ClassNames"
import { StateContext } from "../../CalState"
import { incWeek } from "../../utility/CalendarUtility"

interface IWeekSideBox {
    index: number
    startWeek: number
    currentMode: string
}

export const WeekSideBox = ({ index, startWeek, currentMode }: IWeekSideBox) => {
    const stateContext = useContext(StateContext)
    const week = incWeek(startWeek, index)
    
    
    const handleClick = (week: number) => {
        stateContext.setState({
            mode: CalMode.WEEK,
            week: week
        })
    }

    return (
        <div className={CS(CN.BOX_CAL, CN.CLICKABLE, currentMode, CN.ROWBOX)} onClick={() => {handleClick(week)}}>
            {week}
        </div>
    )
}
