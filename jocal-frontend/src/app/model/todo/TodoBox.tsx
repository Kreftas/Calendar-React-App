import { useNavigate } from "react-router-dom";
import { ITodo } from "./TodoModel"
import { CN, CS } from "../../style/ClassNames"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRef } from "react";
import { Controls } from "../../pages/list/TypeControl";
import { EOrigin } from "../../pages/form/Form";
import { deleteTodo } from "../../api/TodoApi";

export const NullEventBox = () => {
    return (
        <div className={CS(CN.HOME_ITEMBOX, CN.HOME_EVENTBOX)}></div>
    )
}

export const TodoBox = ({ description, id, prio }: ITodo) => {

    const PRIOCOLOR = () => {
        switch (prio) {
            default:
                return CN.PRIO_MODE_HIGH
            case 1:
                return CN.PRIO_MODE_MED
            case 2:
                return CN.PRIO_MODE_LOW
        }
    }

    return (
        <div className={CS(CN.HOME_ITEMBOX, CN.HOME_TODOBOX, PRIOCOLOR())}>
            <p>{description}</p>
        </div>
    )
}

interface IReload {
    sv: (v: any) => void
    v: any
}


export const TodoBoxList = ({ description, prio, id, sv, v }: ITodo & IReload) => {
    const boxRef: any = useRef(null);
    const navigate = useNavigate();

    const PRIOCOLOR = () => {
        switch (prio) {
            default:
                return CN.PRIO_MODE_HIGH
            case 1:
                return CN.PRIO_MODE_MED
            case 2:
                return CN.PRIO_MODE_LOW
        }
    }

    return (
        <div className={CS(CN.BOX_TODO, CN.LIST_BOX, CN.CLICKABLE, PRIOCOLOR())}
            onClick={(e) => {
                if (boxRef.current && !boxRef.current.contains(e.target)) {
                    navigate("../add", {
                        replace: true, state: {
                            form: Controls.TODO,
                            data: {
                                description: description,
                                prio: prio,
                                id: id,
                                origin: EOrigin.TODOLIST
                            }
                        }
                    })
                }
            }}>
            <div className={CN.TODOLABEL}>{description}</div>
            <div className={CN.TODOBUTTONS}>
                <button className={CS(CN.TODOBUTTON, CN.CLICKABLE)} ref={boxRef}
                    onClick={() => {
                        deleteTodo({
                            id: id, onFail: () => { }, onSuccess: () => { sv(v + 1) }
                        })
                    }}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div >
    )
}