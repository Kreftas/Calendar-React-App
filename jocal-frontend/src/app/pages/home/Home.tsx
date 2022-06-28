import { ComponentType, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { selectTopThreeEvent } from "../../api/EventApi"
import { selectTodaysSpecials } from "../../api/SpecialApi"
import { selectTopFiveTodos } from "../../api/TodoApi"
import { UserContext } from "../../App"
import { ITodo, TodoPrioNumber } from "../../model/todo/TodoModel"
import { CN, CS } from "../../style/ClassNames"

import { Controls } from "../list/TypeControl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { NullEventBox, TodoBox } from "../../model/todo/TodoBox"
import { EventBox } from "../../model/event/EventBox"
import { NullSpecialBox, SpecialBox } from "../../model/special/SpecialBox"
import { IEvent, NullEvent } from "../../model/event/EventModel"
import { ISpecial, NullSpecial, SpecialType } from "../../model/special/SpecialModel"


const HomeHeader = () => {
    const userContext = useContext(UserContext);

    const logout = () => {
        if (userContext) {
            userContext.setUser(null)
            localStorage.setItem("user", JSON.stringify(null))
        }
    }

    return (
        <div className={CN.HOME_HEADER}>
            <p> Good day {userContext?.user.username}</p>
            <button onClick={logout} className={CN.CLICKABLE}><FontAwesomeIcon icon={faSignOut} /></button>
        </div>
    )
}


const HomeLists = () => {
    return (
        <div className={CN.HOME_LISTS}>
            <HomeEventlist />
        </div>
    )
}


const HomeEventlist = () => {
    const navigate = useNavigate();

    const RenderEvents = () => {
        const [eventList, setEventList] = useState<[IEvent]>([NullEvent])

        useEffect(() => {
            selectTopThreeEvent(setEventList)
        }, [])

        const boxes: any = []
        let count = 0
        eventList.map(({ datestart, description, id, timeend, timestart, color }) => {
            if (id > 0) {
                count++
                boxes.push(
                    <EventBox datestart={datestart} description={description} id={id} timeend={timeend} timestart={timestart} key={id} color={color} />
                )
            }
        })
        for (count; count < 3; count++) {
            boxes.push(
                <NullEventBox key={count} />
            )
        }
        return (
            <>
                {boxes}
            </>
        )
    }

    const RenderSpecials = () => {
        const [specialList, setSpecialList] = useState<[ISpecial]>([NullSpecial])
        useEffect(() => {
            selectTodaysSpecials(setSpecialList)
        }, [])
        const boxes: any = []

        if (specialList.length < 1) {
            boxes.push(
                <NullSpecialBox key={1} />
            )
        } else {
            specialList.map(({ date, description, id, type }) => {
                boxes.push(
                    <SpecialBox date={date} description={description} id={id} type={type} key={id} />
                )
            })
        }

        return (
            <>
                {boxes}
            </>
        )

    }

    const toList = (from: Controls) => {
        navigate("../todos", { replace: true, state: { form: from } });
    }

    return (
        <div className={CN.HOME_EVEN_CONTAINER}>
            <div className={CN.HOME_LIST}>
                <div className={CN.HOME_LIST_HEADER}>
                    <p className={CN.HOME_LABEL}>Happening today</p>
                    <div className={CN.HOME_BUTTONS}>
                        <button className={CS(CN.HOME_TOCAL_BUTTON, CN.CLICKABLE)} onClick={() => toList(Controls.SPECIAL)} ><FontAwesomeIcon icon={faList} /></button>
                    </div>
                </div>
                <div className={CN.HOME_SPECIALLIST}>
                    <RenderSpecials />
                </div>

            </div>
            <div className={CN.HOME_LIST}>
                <div className={CN.HOME_LIST_HEADER}>
                    <p className={CN.HOME_LABEL}>Upcoming events</p>
                    <div className={CN.HOME_BUTTONS}>
                        <button className={CS(CN.HOME_TOCAL_BUTTON, CN.CLICKABLE)} onClick={() => toList(Controls.EVENT)}><FontAwesomeIcon icon={faList} /></button>
                    </div>
                </div>
                <RenderEvents />
            </div>
            <div className={CN.HOME_LIST}>
                <div className={CN.HOME_LIST_HEADER}>
                    <p className={CN.HOME_LABEL}>Todos</p>
                    <div className={CN.HOME_BUTTONS}>
                        <button className={CS(CN.HOME_TOCAL_BUTTON, CN.CLICKABLE)} onClick={() => toList(Controls.TODO)}><FontAwesomeIcon icon={faList} /></button>
                    </div>
                </div>
                <HomeTodos />
            </div>
        </div>
    )
}


interface IRenderBoxes {

}

const RenderBoxes = () => {
    const boxes = []
    for (let i = 0; i < 5; i++) {
        boxes.push(
            <TodoBox description="yo" id={1} prio={TodoPrioNumber.HIGH} key={i} />
        )
    }
    return (
        <>
            {boxes}
        </>
    )
}

const HomeTodos = () => {
    const [todoList, setTodoList] = useState<[ITodo]>([{ id: -1, description: "", prio: 1 }])

    useEffect(() => {
        selectTopFiveTodos(setTodoList)
    }, [])

    const RenderTodos = () => {
        const boxes: any = []
        todoList.map(({ description, id, prio }) => {
            boxes.push(
                <TodoBox description={description} id={id} prio={prio} key={id} />
            )
        })
        return (
            <>
                {boxes}
            </>
        )
    }

    return (
        <RenderTodos />
    )
}

const HomeContainer = () => {
    return (
        <div className={CN.HOME_CONTAINER}>
            <HomeLists />
        </div>
    )
}


export const Home = () => {
    return (
        <div className={CN.HOME_CONTENT}>
            <HomeHeader />
            <HomeContainer />
        </div>
    )
}
