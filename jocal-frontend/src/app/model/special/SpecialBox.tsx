import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { deleteSpecial } from "../../api/SpecialApi"
import { CN, CS } from "../../style/ClassNames"
import { EOrigin } from "../../pages/form/Form"
import { Controls } from "../../pages/list/TypeControl"
import { ISpecial, SpecialType } from "./SpecialModel"
import { getCurrentYear } from "../../pages/calendar/utility/CalendarUtility"

interface IReload {
    sv: (v: any) => void
    v: any
}


const TYPECOLOR = (type: SpecialType) => {
    switch (type) {
        default:
            return CN.TYPE_BIRTH
        case SpecialType.CELEBRATION:
            return CN.TYPE_CELEB
        case SpecialType.HOLIDAY:
            return CN.TYPE_HOLI
    }
}

export const SpecialBox = ({ date, description, id, type }: ISpecial) => {
    return (
        <div className={CS(CN.HOME_ITEMBOX, CN.HOME_SPECIALBOX, TYPECOLOR(type))}>
            {description}
        </div>
    )
}

export const HourTopSpecialBox = ({ date, description, id, type }: ISpecial) => {
    return (
        <div className={CS(CN.HOURTOP_SPECIALBOX, TYPECOLOR(type))}>
            {description}
        </div>
    )
}


export const NullSpecialBox = () => {
    return (
        <div className={CS(CN.HOME_ITEMBOX, CN.HOME_SPECIALBOX)}>Nothing happening today</div>
    )
}


export const SpecialBoxPopUp = ({ date, description, id, type }: ISpecial) => {

    return (
        <div className={CS(CN.WEEK_EVENTBOX_POPUP, TYPECOLOR(type))}>
            <p>{description}</p>
            {/* <p>{datestart}</p> */}
        </div>
    )
}

export const SpecialBoxList = ({ date, description, type, id, v, sv }: ISpecial & IReload) => {
    const boxRef: any = useRef(null);
    const boxRef2: any = useRef(null);
    const navigate = useNavigate();


    const onNavToAdd = (e: any) => {
        if (boxRef.current && !boxRef.current.contains(e.target) && !boxRef2.current.contains(e.target)) {
            navigate("../add", {
                replace: true, state: {
                    form: Controls.SPECIAL,
                    data: {
                        date: date,
                        description: description,
                        type: type,
                        id: id,
                        origin: EOrigin.TODOLIST
                    }
                }
            })
        }
    }

    const onNavToCal = () => {
        let newDate = getCurrentYear() + "-" + date.substring(5, 10)
        navigate("../cal", {
            state: {
                date: newDate
            }
        })
    }

    const onDelete = () => {
        deleteSpecial({
            id: id, onFail: () => { }, onSuccess: () => { sv(v + 1) }
        })
    }

    return (
        <div className={CS(CN.BOX_TODO, CN.LIST_BOX, CN.CLICKABLE, CN.LIST_SPECIALBOX, TYPECOLOR(type))} onClick={onNavToAdd} >
            <div className={CN.TODOLABEL}>
                <p>{description}</p>
                <p>{date}</p>
            </div>
            <div className={CN.TODOBUTTONS}>
                <button className={CS(CN.TODOBUTTON, CN.CLICKABLE)} ref={boxRef2} onClick={onNavToCal}>
                    <FontAwesomeIcon icon={faCalendar} />
                </button>
                <button className={CS(CN.TODOBUTTON, CN.CLICKABLE)} ref={boxRef} onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}