import axios from "axios"
import { HOST, PORT } from "../../Config"

const ENDPOINT = "/api/todo/"
const API_URL = HOST + PORT + ENDPOINT

const INSERT = "insert"
const UPDATE = "update"
const DELETE = "delete"

const GET = "select/"
const ADDED = "added"
const PRIO = "prio"
const TOPFIVE = "topfive"

interface Icallback {
    onSuccess: () => void,
    onFail: () => void
}

interface insert extends Icallback {
    description: string,
    prio: number
}

interface update extends insert {
    id: number
}

export const insertTodo = ({ description, onFail: useFail, onSuccess: useSuccess, prio }: insert) => {
    axios.post(API_URL + INSERT, {
        description: description,
        prio: prio
    }).then(response => {
        useSuccess()
    }).catch(error => {
        console.log(error)
        useFail()
    });
}


interface Idelete extends Icallback {
    id: number
}

export const deleteTodo = ({id, onSuccess} : Idelete) => {
    axios.post(API_URL + DELETE, {
        id: id
    }).then(response => {
        onSuccess()
    }).catch(error => {
        console.log(error)
    }) 
}


export const selectAllTodos = (setList: any) => {
    axios.get(API_URL + GET + PRIO)
        .then(response => {
            setList(response.data)
        }).catch(error => {
            console.log(error)
        });
}

export const selectTopFiveTodos = (setList: any) => {
    axios.get(API_URL + GET + TOPFIVE)
        .then(response => {
            setList(response.data)
        }).catch(error => {
            console.log(error)
        });
}


export const updateTodo = ({description, id, onFail, onSuccess, prio} : update) => {
    axios.post(API_URL + UPDATE, {
        description: description,
        prio: prio,
        id: id
    }).then(response => {
        onSuccess()
    }).catch(error => {
        console.log(error)
        onFail()
    });
}
