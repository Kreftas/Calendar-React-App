import Axios from 'axios';

import { MakeADate, MakeAYearMonth } from './DateFormater';

const apiUrl = "http://192.168.1.253:3001/api/"
const getDate = "getdate"
const getDeadline = "getdeadline"
const getAdded = "get"
const getPrio = "getprio"
const yearmonth = "getyearmonth"

export const getTodoFromApi = (year, month, day, setTodoList) => {
    Axios.post(apiUrl + getDate, {
        deadline: MakeADate(year, month, day)
    }).then((response) => {
        setTodoList(response.data);
    })
}

export const getMonthTodo = (year, month, setTodoList) => {
    Axios.post(apiUrl + yearmonth, {
        deadline: MakeAYearMonth(year, month)
    }).then((response) => {
        setTodoList(response.data);
    })
}


export function getAllTodoByDeadline(setTodoList) {
    Axios.get(apiUrl + getDeadline).then((response) => {
        setTodoList(response.data);
    })
}

export function getAllTodoByAdded(setTodoList) {
    Axios.get(apiUrl + getAdded).then((response) => {
        setTodoList(response.data);
    })
}

export function getAllTodoByPrio(setTodoList) {
    Axios.get(apiUrl + getPrio).then((response) => {
        setTodoList(response.data);
    })
}


