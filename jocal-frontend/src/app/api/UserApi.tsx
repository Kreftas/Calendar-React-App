import axios from "axios"
import { HOST, PORT } from "../../Config"


const ENDPOINT = "/api/user/"
const API_URL = HOST + PORT + ENDPOINT

const LOGIN = "login"

interface Icallback {
    onSuccess: () => void,
    onFail: (msg: string) => void
}

interface ILogin {
    username: string,
    password: string
}
export const login = ({ password, username, onFail, onSuccess }: ILogin & Icallback) => {
    axios.post(API_URL + LOGIN, {
        password: password,
        username: username
    }).then(response => {
        if (response.data.status) {
            onSuccess()
        } else {
            onFail(response.data.msg)
        }
    }).catch(error => {
        console.log(error)
    });
}
