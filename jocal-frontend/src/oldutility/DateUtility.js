import getWeek from 'date-fns/getWeek'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import getDay from 'date-fns/getDay'
import isThisMonth from 'date-fns/isThisMonth'
import isThisYear from 'date-fns/isThisYear'
import isMonday from 'date-fns/isMonday'

const currentFullDate = new Date();
const currentYear = currentFullDate.getFullYear();
const currentMonth = currentFullDate.getMonth();
const currentWeek = getWeek(currentFullDate, {
    weekStartsOn: 0,
    firstWeekContainsDate: 4
});
const currentDay = currentFullDate.getDate();

export function getCurrentFullDate() {
    return currentFullDate
}

export function getCurrentYear() {
    return currentYear
}

export function getCurrentMonth() {
    return currentMonth
}

export function getCurrentWeek() {
    return currentWeek
}

export function getCurrentDay() {
    return currentDay
}

export function setCustomTime({ year, month, week, day } = {}) {
    return {
        year: year ? year : currentYear,
        month: month ? month : currentMonth,
        week: week ? week : currentWeek,
        day: day ? day : currentDay
    }
}

//date-fns getDay() : return 0-6 (sun, mon, tues, wed, thur, fri, sat)
export function getStartDay(year, month) {
    let day = getDay(new Date(year, month, 1))
    day = day === 0 ? 7 : day
    return day - 1
}

export function getDayInWeek(year, month, day) {
    return getDay(new Date(year, month, day))
}

export function getStartWeek(year, month) {
    let week = getWeek(new Date(year, month, 0), {
        weekStartsOn: 0,
        firstWeekContainsDate: 4
    })
    week = week === 0 ? 52 : week
    return week
}

export function getDaysInAMonth(year, month) {
    return getDaysInMonth(new Date(year, month))
}



//Might be unsafe / impure
export function isCurrentMonth(year, month, day) {
    const d = new Date(year, month, day)
    return isThisMonth(d) && isThisYear(d)
}

export function isCurrentYear(year, month, day) {
    const d = new Date(year, month, day)
    return isThisYear(d)
}




export function getWeekInfo(year, week, month) {
    const startDayOfYear = getStartDay(year, 0)
    const dayInDec = 31 - startDayOfYear + 1
    let firstWholeWeekDay = 8 - startDayOfYear
    const firstWeekInJan = getStartWeek(year, 0)

    if (startDayOfYear == 0) {
        firstWholeWeekDay = 1
    }

    return {
        dd: dayInDec,
        ff: firstWholeWeekDay,
        jj: firstWeekInJan
    }
}





export function getWeekDates(year, month, week) {
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

export function getFirstDateInWeek(year, month, week) {
    let makeDay = loopMonthAddWeek(year, month, week)
    return correctDate(makeDay, month, year, week)
}

function loopMonthAddWeek(year, month, week) {
    let makeDay = getDayOfYear(year, week)
    for (let i = 0; i < month; i++) {
        makeDay = makeDay - getDaysInAMonth(year, i)
    }
    return makeDay
}

function getDayOfYear(year, week) {
    const firstWholeWeekDay = 8 - getStartDay(year, 0)
    let makeDay = ((week - 1) * 7)
    if (getStartWeek(year, 0) != 1) {
        makeDay += firstWholeWeekDay
    }
    return makeDay
}

function correctDate(makeDay, month, year, week) {
    let makeYear = year
    let makeMonth = month
    let splitIndex = 0
    const daysInlastMonth = getDaysInAMonth(year, getLastMonth(month))
    const startDayOfMonth = getStartDay(year, month)
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

function getLastMonth(month) {
    let lastMonth = month - 1
    if (lastMonth < 0) {
        lastMonth = 11
    }
    return lastMonth
}
















