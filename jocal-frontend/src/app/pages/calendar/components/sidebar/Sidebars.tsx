import React, { useContext } from 'react'
import { CalMode } from '../../../../model/calendar/CalendarModel'
import { CN, CS } from '../../../../style/ClassNames'
import { ICalStateContext, StateContext } from '../../CalState'
import { getDaysInAMonth, getLastWeekYear, getMonthFromWeek, getWeekFromMonth } from '../../utility/CalendarUtility'

export const Leftbar = () => {
    const context = useContext(StateContext)

    return (
        <div className={CS(CN.SIDEBAR, CN.LEFTBAR)}>
            <div className={CS(CN.BOX_CAL, CN.SIDEBAR_BUTTON)}>
                <div className={CS(CN.SIDEBAR_ARROW_LEFT)}>
                    <div className={CS(CN.SIDEBAR_ARROW_LEFT_INNER)} onClick={() => { onArrowClick({ context: context, direction: -1 }) }}></div>
                </div>
            </div>
        </div>
    )
}

interface ArrowClick {
    direction: number
    context: ICalStateContext
}


const incYear = (year: number, amount: number) => {
    return year + amount
}

const incMonth = (month: number, year: number, amount: number) => {
    let newyear = year
    let newmonth = month + amount
    if (newmonth < 0) {
        newmonth = 11
        newyear += amount
    } else if (newmonth > 11) {
        newmonth = 0
        newyear += amount
    }
    return {
        newmonth: newmonth,
        newyear: newyear
    }
}

const incWeek = (week: number, year: number, amount: number) => {
    let newyear = year
    let newweek = week + amount
    if (newweek < 1) {
        newyear += amount
        newweek = getLastWeekYear(newyear)
    } else if (newweek > getLastWeekYear(newyear)) {
        newyear += amount
        newweek = 1
    }
    return {
        newweek: newweek,
        newyear: newyear,
        newmonth: getMonthFromWeek(newweek)
    }
}

const incDay = (day: number, week: number, month: number, year: number, amount: number) => {
    //IF YEAR NEED CHECK MONTH 
    let newday = day + amount
    let newmonth = month
    let newyear = year
    if (newday < 1) {
        let newmonthdate = incMonth(month, year, amount)
        newmonth = newmonthdate.newmonth
        newyear = newmonthdate.newyear
        newday = getDaysInAMonth(year, newmonth)
    } else if (newday > getDaysInAMonth(year, month)) {
        let newmonthdate = incMonth(month, year, amount)
        newmonth = newmonthdate.newmonth
        newyear = newmonthdate.newyear
        newday = 1
    }
    
    return {
        newweek: getWeekFromMonth(newyear, newmonth, newday),
        newyear: newyear,
        newmonth: newmonth,
        newday: newday
    }
}

const onArrowClick = ({ context, direction }: ArrowClick) => {
    switch (context.state.mode) {
        case CalMode.YEAR:
            context.setState({
                year: incYear(context.state.year, direction)
            })
            break;
        case CalMode.WEEKYEAR:
            context.setState({
                year: incYear(context.state.year, direction)
            })
            break;
        case CalMode.MONTH:
            let newmonthdate = incMonth(context.state.month, context.state.year, direction)
            context.setState({
                month: newmonthdate.newmonth,
                year: newmonthdate.newyear
            })
            break;
        case CalMode.WEEK:
            let newweekdate = incWeek(context.state.week, context.state.year, direction)
            context.setState({
                week: newweekdate.newweek,
                year: newweekdate.newyear,
                month: newweekdate.newmonth
            })
            break;
        default:
            let newdaydate = incDay(context.state.day, context.state.week, context.state.month, context.state.year, direction)
            context.setState({
                year: newdaydate.newyear,
                month: newdaydate.newmonth,
                week: newdaydate.newweek,
                day: newdaydate.newday
            })
            break;
    }
}


export const Rightbar = () => {
    const context = useContext(StateContext)



    return (
        <div className={CS(CN.SIDEBAR, CN.RIGHTBAR)}>
            <div className={CS(CN.BOX_CAL, CN.SIDEBAR_BUTTON)}>
                <div className={CS(CN.SIDEBAR_ARROW_RIGHT)}>
                    <div className={CS(CN.SIDEBAR_ARROW_RIGHT_INNER)} onClick={() => { onArrowClick({ context: context, direction: 1 }) }}></div>
                </div>
            </div>
        </div>
    )
}

