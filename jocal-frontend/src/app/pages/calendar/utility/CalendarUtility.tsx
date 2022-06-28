import getWeek from 'date-fns/getWeek'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import getDay from 'date-fns/getDay'
import isThisMonth from 'date-fns/isThisMonth'
import isThisYear from 'date-fns/isThisYear'
import isMonday from 'date-fns/isMonday'
import isToday from 'date-fns/isToday'


import { CalState, CalMode, UpdateCalState } from '../../../model/calendar/CalendarModel';
import isThisWeek from 'date-fns/isThisWeek'
import { CN } from '../../../style/ClassNames'


const currentFullDate = new Date();
const currentYear = currentFullDate.getFullYear();
const currentMonth = currentFullDate.getMonth();
const currentWeek = getWeek(currentFullDate, {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
});
const currentDay = currentFullDate.getDate();
const currentHour = currentFullDate.getHours();
const currentMinute = currentFullDate.getMinutes();

export const MakeADate = (year: number, month: number, date: number) => {
    return year + "-" + putZero(month + 1) + "-" + putZero(date)
}

function putZero(monthy: number) {
    if (monthy < 10) {
        var makeMonth: string = "0" + monthy
    } else {
        var makeMonth: string = String(monthy)
    }
    return makeMonth
}

export const MakeATime = (index: number) => {
    return putZero(index) + ":00"
}


export function getTodaysDate(): CalState {
    return {
        year: currentYear,
        month: currentMonth,
        week: currentWeek,
        day: currentDay,
        mode: CalMode.MONTH
    }
}

export function getTodaysDateGuess(): UpdateCalState {
    return {
        year: currentYear,
        month: currentMonth,
        week: currentWeek,
        day: currentDay,
        mode: CalMode.MONTH
    }
}

export function getTodaysTodoDate() {
    return {
        date: currentYear + "-" + (currentMonth+1) + "-" + currentDay,
        time: currentHour + ":" + currentMinute
    }
}



export function getCurrentYear() {
    return currentYear
}

export function getCurrentDecennium() {
    return currentYear - (currentYear % 10)
}

export function getDaysInAMonth(year: number, month: number): number {
    return getDaysInMonth(new Date(year, month))
}

export function getStartDayInMonth(year: number, month: number): number {
    let day = getDay(new Date(year, month, 1))
    return day === 0 ? 6 : day - 1
}

export function getDayInWeek(year: number, month: number, day: number): number {
    let weekday  = getDay(new Date(year, month, day))
    return weekday === 0 ? 6 : weekday - 1
}
    

export function getWeekFromMonth(year: number, month: number, day: number): number {
    let week = getWeek(new Date(year, month, day), {
        weekStartsOn: 1,
        firstWeekContainsDate: 4
    })
    week = week === 0 ? 52 : week
    return week
}

export function getFirstWeekMonth(year: number, month: number): number {
    let week = getWeek(new Date(year, month, 0), {
        weekStartsOn: 0,
        firstWeekContainsDate: 4
    })
    week = week === 0 ? 52 : week
    return week
}

export function getLastWeekYear(year: number): number {
    let week = getWeek(new Date(year, 11, 31), {
        weekStartsOn: 0,
        firstWeekContainsDate: 4
    })
    week = week === 0 ? 52 : week
    return week
}

export function getMonthFromWeek(week: number) {
    let monthDouble = week / 4.345
    monthDouble = monthDouble >= 12.0 ? 11.0 : monthDouble
    return monthDouble | 0
}

export function incWeek(firstWeek : number, row : number) {
    if (firstWeek >= 52) {
        if(row == 0) {
            return firstWeek
        } else {
            return row
        }
    } else  {
        return firstWeek + row
    }
}






export function setCurrentWeekDay(state: CalState, day: number) {
    let yes = isCurrDay(day) && isCurrWeek(state.week) && isCurrYear(state.year)
    return wantCurrentClassName(yes)
}

export function setCurrentMonthDay(state: CalState, day: number) {
    let yes = isCurrDay(day) && isCurrMonth(state.month) && isCurrYear(state.year)
    return wantCurrentClassName(yes)
}

export function setCurrentMonth(state: CalState, month: number) {
    let yes = isCurrMonth(month) && isCurrYear(state.year)
    return wantCurrentClassName(yes)
}

export function setCurrentWeek(state: CalState, week: number) {
    let yes = isCurrWeek(week) && isCurrYear(state.year)
    return wantCurrentClassName(yes)
}

export function setCurrentYear(year: number) {
    let yes = isCurrYear(year)
    return wantCurrentClassName(yes)
}

function isCurrDay(day: number) {
    return day == currentDay;
}

function isCurrMonth(month: number) {
    return month == currentMonth;
}

function isCurrWeek(week: number) {
    return week == currentWeek;
}

function isCurrYear(year: number) {
    return year == currentYear;
}

function wantCurrentClassName(yes: boolean) {
    if (yes) {
        return CN.CURRENTBOX
    } else {
        return ""
    }
}




export function getWeekDates(year: number, month: number, week: number) {
    let firstWeekDate = getFirstDateInWeek(year, month, week)
    let weekYear = firstWeekDate.year
    let weekMonth = firstWeekDate.month
    let weekDay = firstWeekDate.day

    const weekDates = []
    for (let i = 0; i < 7; i++) {
        const weekDate = {
            year: weekYear,
            month: weekMonth,
            day: weekDay
        }
        weekDates.push(weekDate)

        weekDay++
        if (weekDay > getDaysInAMonth(weekYear, weekMonth)) {
            weekMonth++
            weekDay = 1
            if (weekMonth > 11) {
                weekYear++
                weekMonth = 0
            }
        }
    }
    return weekDates
}

function getFirstDateInWeek(year: number, month: number, week: number) {
    let makeDay = loopMonthAddWeek(year, month, week)
    return correctDate(makeDay, month, year, week)
}

function loopMonthAddWeek(year: number, month: number, week: number) {
    let makeDay = getDayOfYear(year, week)
    for (let i = 0; i < month; i++) {
        makeDay = makeDay - getDaysInAMonth(year, i)
    }
    return makeDay
}

function getDayOfYear(year: number, week: number) {
    const firstWholeWeekDay = 8 - getStartDayInMonth(year, 0)
    let makeDay = ((week - 1) * 7)
    if (getFirstWeekMonth(year, 0) != 1) {
        makeDay += firstWholeWeekDay
    }
    return makeDay
}

function correctDate(makeDay: number, month: number, year: number, week: number) {
    let makeYear = year
    let makeMonth = month
    let splitIndex = 0
    const daysInlastMonth = getDaysInAMonth(year, getLastMonth(month))
    const startDayOfMonth = getStartDayInMonth(year, month)
    if (makeDay < 1) {
        makeMonth -= 1
        splitIndex = -1
        makeDay = daysInlastMonth + makeDay
    }
    if (makeDay > 31) {
        makeMonth = getLastMonth(makeMonth)
        makeYear -= 1
        splitIndex = -1
        makeDay = daysInlastMonth - startDayOfMonth + 1
    }
    return {
        year: makeYear,
        month: makeMonth,
        week: week,
        day: makeDay,
        splitIndex: splitIndex
    }
}

function getLastMonth(month: number) {
    let lastMonth = month - 1
    if (lastMonth < 0) {
        lastMonth = 11
    }
    return lastMonth
}
