

export function getIndex(row, col, cols) {
    return col + row * cols
}

export function incWeek(firstWeek, row) {
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

export function changeWeek(week, amount, maxweek) {
    let res = week + amount
    if(res < 0) {
        res = maxweek
    } else if (res > maxweek) {
        res  = 0
    }
    return {
        nweek: res,
    }
}

export function getDay(index, startDay) {
    return index + 1 - startDay
}

export function changeMonth(month, year, amount) {
    let nmonth = month + amount
    let nyear = year
    if(nmonth < 0) {
        nmonth = 11
        nyear -= 1
    } else if (nmonth > 11) {
        nmonth = 0
        nyear += 1
    }
    return {
        nmonth: nmonth,
        nyear: nyear
    }
}