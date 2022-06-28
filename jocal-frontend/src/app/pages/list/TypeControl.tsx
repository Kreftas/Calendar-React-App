import { CN, CS } from "../../style/ClassNames"

export enum Controls {
    TODO = "Todo",
    SPECIAL = "Special day",
    EVENT = "Event"
}

interface ITypeControls {
    filter: Controls
    setFilter: (filter: Controls) => void
}

const ACTIVE = (mode: Controls, control: Controls ) => {
    return mode === control ? CN.TODO_ACTIVE_FORM_BUTTON : ""
}

export const TypeControls = ({ filter, setFilter }: ITypeControls) => {
    return (
        <div className={CN.TODO_LIST_CONTROLLER}>
            <div className={CN.TODOCONTROLBOX}>
                <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODOCONTROL, ACTIVE(Controls.TODO, filter))} onClick={() => { setFilter(Controls.TODO) }}>Todo</div>
                <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODOCONTROL, ACTIVE(Controls.EVENT, filter))} onClick={() => { setFilter(Controls.EVENT) }}>Event</div>
                <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODOCONTROL, ACTIVE(Controls.SPECIAL, filter))} onClick={() => { setFilter(Controls.SPECIAL) }}>Special day</div>
            </div>
        </div>

    )
}