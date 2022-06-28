import axios from "axios"
import { HOST, PORT } from "../../Config"
import { SpecialType } from "../model/special/SpecialModel"

const ENDPOINT = "/api/special/"
const API_URL = HOST + PORT + ENDPOINT

const INSERT = "insert"
const UPDATE = "update"

const DELETE = "delete"


const GET = "select/"
const ADDED = "added"
const TODAY = "today"
const MONTH = "month"
const DAY = "day"

interface Icallback {
    onSuccess: () => void,
    onFail: () => void
}   

interface insert extends Icallback{
    description : string, 
    date: string, 
    type: SpecialType
}

interface update extends insert {
    id: number
}

export const insertSpecial = ({date, description, onFail: onFail, onSuccess: onSuccess, type} : insert) => {
    axios.post(API_URL + INSERT, {
        description: description,
        date: date,
        type: type        
    }).then(response => {
        // console.log(response.data)
        onSuccess()
    }).catch((error) => {
        onFail()
    });
}

export const updateSpecial = ({date, description, onFail: onFail, onSuccess: onSuccess, type, id} : update) => {
    axios.post(API_URL + UPDATE, {
        description: description,
        date: date,
        type: type,
        id: id
    }).then(response => {
        // console.log(response.data)
        onSuccess()
    }).catch((error) => {
        onFail()
    });
}

interface Idelete extends Icallback {
    id: number
}
export const deleteSpecial = ({id, onSuccess}: Idelete) => {
    axios.post(API_URL + DELETE, {
        id: id
    }).then(response => {
        onSuccess()
    }).catch(error => {
        console.log(error)
    }) 
}

interface ISelectMonth {
    setList : any,
    month: number
}
export const selectSpecialsMonth = ({month, setList} : ISelectMonth) => {
    axios.post(API_URL + GET + MONTH, {
        month: month,
    })
    .then(response => {
        setList(response.data)
    }).catch(error => {
        console.log(error)
    });
}

interface ISelectDay {
    setList : any,
    month: number,
    day: number
}
export const selectSpecialsDay = ({month, day, setList} : ISelectDay) => {
    axios.post(API_URL + GET + DAY, {
        month: month,
        day: day
    })
    .then(response => {
        setList(response.data)
    }).catch(error => {
        console.log(error)
    });
}

export const selectAllSpecials = (setList : any) => {
    axios.get(API_URL + GET + ADDED)
    .then(response => {
        setList(response.data)
    }).catch(error => {
        console.log(error)
    });
}

export const selectTodaysSpecials = (setList : any) => {
    axios.get(API_URL + GET + TODAY)
    .then(response => {
        setList(response.data)
    }).catch(error => {
        console.log(error)
    });
}
