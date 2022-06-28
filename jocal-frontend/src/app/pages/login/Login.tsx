import { useState, useEffect, useRef } from 'react'
import { CN } from '../../style/ClassNames';
import { login } from '../../api/UserApi';
import { IUser } from '../../model/user/UserModel';
import { useNavigate } from 'react-router-dom';


interface IUsernameForm {
    setUsername: (username: string) => void
    usernameRef: any
}
const UsernameForm = ({ setUsername, usernameRef }: IUsernameForm) => {
    return (
        <div className={CN.LOG_FORM}>
            <h2 className={CN.LOG_LABEL}>Username</h2>
            <input
                type="text"
                className={CN.LOG_INPUT}
                ref={usernameRef}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
    )
}

interface IPasswordForm {
    setPassword: (password: string) => void
}
const PasswordForm = ({ setPassword }: IPasswordForm) => {
    return (
        <div className={CN.LOG_FORM}>
            <h2 className={CN.LOG_LABEL}>Password</h2>
            <input
                type="password"
                className={CN.LOG_INPUT}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
}

interface ISubmitForm {
    password: string,
    username: string,
    setUser: (username: IUser | null) => void
}
const SubmitForm = ({ password, username, setUser }: ISubmitForm) => {
    const navigate = useNavigate()

    const onSubmit = () => {
        login({ username: username, password: password, onSuccess: onSuccess, onFail: onFail })
    }

    const onSuccess = () => {
        setUser({
            username: username
        })
        localStorage.setItem("user", JSON.stringify({username: username}))
        navigate("/")
    }

    const onFail = (msg: string) => {
        alert(msg)
    }

    return (
        <div className={CN.LOG_FORM}>
            <button
                className={CN.LOG_BUTTON}
                onClick={() => onSubmit()}>
                Submit
            </button>

        </div>
    )
}

interface ILogin {
    setUser: (username: IUser | null) => void
}
export const Login = ({ setUser }: ILogin) => {
    const usernameRef = useRef<HTMLDivElement>(null);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (usernameRef.current !== null) {
            usernameRef.current.focus()
        }
    }, [])

    return (
        <div className={CN.LOG_CONTENT}>
            <div className={CN.LOG_BOX}>
                <UsernameForm setUsername={setUsername} usernameRef={usernameRef} />
                <PasswordForm setPassword={setPassword} />
                <SubmitForm password={password} username={username} setUser={setUser} />
            </div>
        </div>
    )
}
