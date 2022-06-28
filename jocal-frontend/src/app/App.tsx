import "./style/Home.scss"
import './style/App.scss';
import "./style/Header.scss"
import './style/Log.scss';
import "./style/Todo.scss"
import "./style/Todoform.scss"  
import "./style/Calendar.scss"
import "./style/Components.scss"
import "./style/Calbar.scss"
import "./style/BoxMould.scss"
import { CN } from './style/ClassNames';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './pages/header/Header';
import { Calendar } from './pages/calendar/Calendar';
import { Todos } from './pages/list/Todos';
import { Form } from './pages/form/Form';
import { Login } from './pages/login/Login';
import { createContext, useEffect, useState } from 'react';
import { IUser } from './model/user/UserModel';
import { Home } from './pages/home/Home';
import { DEFUALTUSER } from "../Config";


interface IUserContext {
    user: IUser,
    setUser: (user: IUser | null) => void
}

export const UserContext = createContext<IUserContext | null>(null);

function App() {
    const [user, setUser] = useState<IUser | null>(DEFUALTUSER)

    useEffect(() => {
        const data = localStorage.getItem("user")
        if (data) {
            setUser(JSON.parse(data))
        }
    }, [])

    return (
        <Router>
            <div className={CN.APP}>

                {user == null ?
                    <Login setUser={setUser} />
                    :
                    <UserContext.Provider value={{ user: user, setUser: setUser }}>
                        <Header />
                        <div className={CN.CONTENT}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/todos" element={<Todos />} />
                                <Route path="/add" element={<Form />} />
                                <Route path="/cal" element={<Calendar />} />
                            </Routes>
                        </div>
                    </UserContext.Provider>
                }
            </div>
        </Router>
    );
}

export default App;
