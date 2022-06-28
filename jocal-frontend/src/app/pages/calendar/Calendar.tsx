import { CN } from '../../style/ClassNames'
import { getTodaysDate, getWeekFromMonth } from './utility/CalendarUtility';
import { CalMode } from '../../model/calendar/CalendarModel';
import { Month } from './components/month/Month'
import { Week } from './components/week/Week';
import { Day } from './components/day/Day';
import { CalHeader } from './components/calheader/CalHeader';
import { StateContext, useCalState } from './CalState';
import { MonthYear } from './components/monthyear/MonthYear';
import { WeekYear } from './components/weekyear/WeekYear';
import { Life } from "./components/life/Life";
import { Leftbar, Rightbar } from "./components/sidebar/Sidebars";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Calendar = () => {
    const [state, setState] = useCalState(getTodaysDate())
    const location = useLocation();

    useEffect(() => {
        if(location.state) {
            const date: any = location.state
            const d = new Date(String(date.date))
            const week = getWeekFromMonth(d.getFullYear(), d.getMonth(), d.getDate())
            setState({
                day: d.getDate(),
                mode: CalMode.WEEK,
                month: d.getMonth(),
                week: week,
                year: d.getFullYear()
            })
        } else {
            const data = localStorage.getItem("calstate")
            if(data) {
                setState(JSON.parse(data))
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("calstate", JSON.stringify(state))
    })

    function renderMode() {
        switch (state.mode) {
            case CalMode.LIFE:
                return <Life />
            case CalMode.YEAR:
                return <MonthYear />
            case CalMode.WEEKYEAR:
                return <WeekYear />
            case CalMode.MONTH:
                return <Month />
            case CalMode.WEEK:
                return <Week />
            case CalMode.DAY:
                return <Day />
            default:
                return <Month />
        }
    }

    return (
        <div className={CN.CALENDAR}>
            <StateContext.Provider value={{ state, setState }}>
                <CalHeader />
                <div className={CN.CALTABLE}>
                    <Leftbar />
                    <div>
                        {renderMode()}
                    </div>
                    <Rightbar />
                </div>


            </StateContext.Provider>
        </div>
    )
}
