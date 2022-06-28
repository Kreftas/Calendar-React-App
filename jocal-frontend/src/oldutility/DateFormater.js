function putZero(monthy) {
    if (monthy < 10) {
        var makeMonth = "0" + monthy
    } else {
        var makeMonth = monthy
    }
    return makeMonth
}

export const MakeADate = (year, month, date) => {
    return year + "-" + putZero(month + 1) + "-" + putZero(date)
}

export const MakeAYearMonth = (year, month) => {
    return year + putZero(month + 1)
}
