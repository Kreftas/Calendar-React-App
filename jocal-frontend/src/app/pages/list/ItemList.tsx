

import { CN, CS } from "../../style/ClassNames";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controls } from "./TypeControl";
import { IFormMode } from "../form/Form";
import { TodoList } from "./Todolist";
import { EventList } from "./Eventlist";
import { SpecialList } from "./Speciallist";

export interface IList {
    filter: Controls
    setReload: (reload: number) => void
    reload: number
}

interface INew {
    filter: Controls
}

const NewTodoButton = ({ filter }: INew) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("../add", {
            replace: true,
            state: {
                form: filter,
                formMode: IFormMode.NEW
            }
        });
    }

    return (
        <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.NEWTODO)} onClick={onClick}>
            New {filter}
        </div>
    )
}

interface ITodoList {
    filter: Controls
    setFilter: (filter: Controls) => void
}


export const OldTodoList = ({ filter, setFilter }: ITodoList) => {
    const [reload, setReload] = useState(1)
    const location = useLocation();


    useEffect(() => {
        if (location.state) {
            let form: any = location.state
            setFilter(form.form)
        }
    }, [])


    const RenderList = () => {
        switch (filter) {
            default:
                return <TodoList filter={filter} reload={reload} setReload={setReload}/>
            case Controls.EVENT:
                return <EventList filter={filter} reload={reload} setReload={setReload}/>
            case Controls.SPECIAL:
                return <SpecialList filter={filter} reload={reload} setReload={setReload}/>
        }
    }

    return (
        <>
            <div className={CS(CN.TODO_LIST_SCROLL, CN.TODO_LIST)}>
                <RenderList />
            </div>
            <div className={CS(CN.TODO_LIST)}>
                <NewTodoButton filter={filter} />
            </div>
        </>

    )
}
