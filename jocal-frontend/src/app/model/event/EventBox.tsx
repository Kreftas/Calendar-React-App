import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../api/EventApi";
import { CN, CS } from "../../style/ClassNames";
import { EOrigin, IFormMode } from "../../pages/form/Form";
import { Controls } from "../../pages/list/TypeControl";
import { IEvent } from "./EventModel";

interface IReload {
    sv: (v: any) => void
    v: any
}


interface IRenderTimeOrAllDay {
    timestart: string | null, 
    timeend: string | null
} 
const RenderTimeOrAllDay = ({timeend, timestart}: IRenderTimeOrAllDay) => {
    if (timestart == null) {
        return (
            <p>All day</p>
        )
    } else {
        return (
            <p>{timestart} - {timeend}</p>
        )
    }
}

const TypeColor = (color: number) => {
    switch (color) {
        case 0:
            return CN.MODE_EVENTCOLOR_1
        case 1:
            return CN.MODE_EVENTCOLOR_2
        case 2:
            return CN.MODE_EVENTCOLOR_3
        case 3:
            return CN.MODE_EVENTCOLOR_4
        case 4:
            return CN.MODE_EVENTCOLOR_5
        default:
            return CN.MODE_EVENTCOLOR_2
    }
}


export const EventBox = ({ datestart, description, id, timeend, timestart, color }: IEvent) => {

    const navigate = useNavigate();

    const onNavToCal = () => {
        navigate("./cal", {
            state: {
                date: datestart
            }
        })
    }

    return (
        <div className={CS(CN.HOME_ITEMBOX, CN.HOME_EVENTBOX, TypeColor(color))}>
            <p>{description}</p>
            <p>{datestart}</p>
            <RenderTimeOrAllDay timestart={timestart} timeend={timeend} />
            <button className={CS(CN.HOME_TOCAL_BUTTON, CN.CLICKABLE)} onClick={onNavToCal}><FontAwesomeIcon icon={faCalendar} /></button>
        </div>
    )
}

export const EventBoxPopUp = ({ timestart, timeend, description, datestart, color }: IEvent) => {

    return (
        <div className={CS(CN.WEEK_EVENTBOX_POPUP, TypeColor(color))}>
            <p>{description}</p>
            {/* <p>{datestart}</p> */}
        </div>
    )
}

export const EventBoxDaySide = ({ timestart, timeend, description, datestart, color, id }: IEvent) => {

    const navigate = useNavigate();

    const onNavToAdd = (e: any) => {
            navigate("../add", {
                replace: true, state: {
                    form: Controls.EVENT,
                    formMode: IFormMode.UPDATE,
                    origin: EOrigin.CALENDAR,
                    data: {
                        dateStart: datestart,
                        description: description,
                        timeEnd: timeend,
                        timeStart: timestart,
                        id: id,
                        color: color
                    }
                }
            })
        
    }

    return (
        <div className={CS(CN.DAY_SIDEBOX_EVENT, CN.CLICKABLE, TypeColor(color))}  onClick={onNavToAdd} >
            <p>{description}</p>
            {/* <p>{datestart}</p> */}
        </div>
    )
}



export const EventBoxList = ({ id, description, datestart, v, sv, timeend, timestart, color }: IEvent & IReload) => {
    const boxRef: any = useRef(null);
    const boxRef2: any = useRef(null);
    const navigate = useNavigate();

    const onNavToAdd = (e: any) => {
        if (boxRef.current && !boxRef.current.contains(e.target) && !boxRef2.current.contains(e.target)) {
            navigate("../add", {
                replace: true, state: {
                    form: Controls.EVENT,
                    formMode: IFormMode.UPDATE,
                    origin: EOrigin.TODOLIST,
                    data: {
                        dateStart: datestart,
                        description: description,
                        timeEnd: timeend,
                        timeStart: timestart,
                        id: id,
                        color: color
                    }
                }
            })
        }
    }

    const onNavToCal = () => {
        navigate("../cal", {
            state: {
                date: datestart
            }
        })
    }

    const onDelete = () => {
        deleteEvent({
            id: id,
            onFail: () => { },
            onSuccess: () => {
                sv(v + 1)
            }
        })
    }



    return (
        <div className={CS(CN.BOX_TODO, CN.LIST_BOX, CN.CLICKABLE, CN.LIST_EVENTBOX, TypeColor(color))} onClick={onNavToAdd}>
            <div className={CN.TODOLABEL}>
                <p>{description}</p>
                <p>{datestart}</p>
                <RenderTimeOrAllDay timestart={timestart} timeend={timeend} />
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