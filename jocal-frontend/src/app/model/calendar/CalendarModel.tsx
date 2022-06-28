export enum Weekdays {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday",
}

export enum Seasons {
    WINTER = "Winter",
    SPRING = "Spring",
    SUMMER = "Summer",
    FALL = "Autumn"
}

export enum Months {
    JAN = "January",
    FEB = "Februrary",
    MAR = "March",
    APR = "April",
    MAY = "May",
    JUN = "June",
    JUL = "July",
    AUG = "August",
    SEP = "September",
    OKT = "October",
    NOV = "November",
    DEC = "December"
}

export interface CalState {
    year: number
    month: number
    week: number
    day: number
    mode: CalMode
}

export interface UpdateCalState {
    year?: number
    month?: number
    week?: number
    day?: number
    mode?: CalMode
}

export enum CalMode {
    LIFE,
    YEAR,
    WEEKYEAR,
    MONTH,
    WEEK,
    DAY,
}

export const CalModes = ["Life", "Year", "WeekYear", "Month", "Week", "Day"]

export interface ICal {
    state: CalState,
    setState: (state: UpdateCalState) => void,
}