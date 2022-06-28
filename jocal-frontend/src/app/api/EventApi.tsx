import axios from "axios"
import { HOST, PORT } from "../../Config"


const ENDPOINT = "/api/event/"
const API_URL = HOST + PORT + ENDPOINT


const INSERTTIME = "insert/"
const TIME = "time"

const UPDATE = "update"

const SELECT = "select/"
const DATE = "date"
const TOPTHREE = "topthree"
const MONTH = "month"
const DAY = "day"

const DELETE = "delete"


interface Icallback {
    onSuccess: () => void,
    onFail: () => void
}   

interface insert extends Icallback {
    desc: string, 
    dateStart: string, 
    timeStart: string | null, 
    timeEnd: string | null,
    color: number
}

interface update extends insert {
    id: number
}

export const insertEventTime = ({ dateStart, desc, onFail, onSuccess, timeEnd, timeStart, color} : insert) => {
    axios.post(API_URL + INSERTTIME + TIME, {
        description: desc, 
        datestart: dateStart, 
        timestart: timeStart, 
        timeend: timeEnd,
        color: color
    }).then(response => {
        // console.log(response.data)
        onSuccess()
    }).catch((error) => {
        onFail()
    });
}

export const updateEventTime = ({dateStart, desc, onFail, onSuccess, timeEnd, timeStart, id, color} : update) => {
    axios.post(API_URL + UPDATE, {
        description: desc, 
        datestart: dateStart, 
        timestart: timeStart, 
        timeend: timeEnd,
        id: id,
        color: color
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
export const deleteEvent = ({id, onSuccess}: Idelete) => {
    axios.post(API_URL + DELETE, {
        id: id
    }).then(response => {
        onSuccess()
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    }) 
}

export const selectAllEvent = (setList: any) => {
    axios.get(API_URL + SELECT + DATE)
        .then(response => {            
            setList(response.data)  
        }).catch(error => {
            console.log(error)
        });
}

export const selectTopThreeEvent = (setList: any) => {
    axios.get(API_URL + SELECT + TOPTHREE)
        .then(response => {            
            setList(response.data)  
        }).catch(error => {
            console.log(error)
        });
}

interface ISelectMonth {
    setList : any,
    month: number,
    year: number
}
export const selectEventsMonth = ({month, setList, year} : ISelectMonth) => {
    axios.post(API_URL + SELECT + MONTH, {
        month: month,
        year: year
    })
    .then(response => {
        setList(response.data)
    }).catch(error => {
        console.log(error)
    });
}

interface ISelectDay {
    setList : any,
    year: number,
    month: number,
    day: number
}
export const selectEventsDay = ({month, day, year,setList} : ISelectDay) => {
    axios.post(API_URL + SELECT + DAY, {
        year: year,
        month: month,
        day: day
    })
    .then(response => {
        setList(response.data)
    }).catch(error => {
        console.log(error)
    });
}
