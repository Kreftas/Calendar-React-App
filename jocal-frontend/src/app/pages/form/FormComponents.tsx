import { useEffect, useState } from "react"
import { CN, CS } from "../../style/ClassNames"
import { TodoPrio } from "../../model/todo/TodoModel"
import { SpecialType } from "../../model/special/SpecialModel"


interface IDescForm {
    setDesc: (desc: string) => void
    desc: string
}

export const FormDescription = ({ setDesc, desc }: IDescForm) => {
    const onChange = (e : any) => {
        setDesc(e.target.value)
    }
    return (
        <div className={CN.TODO_FORM_BOX}>
            <div className={CN.TODO_FORM_LABEL}>Description</div>
            <div className={CN.TODO_FORM_INPUTS}>
                <input type="text" className={CN.TODO_FORM_INPUT} value={desc} onChange={onChange} />
            </div>
        </div>
    )
}


interface IFormDateSingle {
    setDate: (date: string) => void
    date: string
}

export const FormDateSingle = ({ setDate, date}: IFormDateSingle) => {
    const onChange = (e : any) => {
        setDate(e.target.value)
    }
    return (
        <div className={CN.TODO_FORM_BOX}>
            <div className={CN.TODO_FORM_LABEL}>Date</div>
            <div className={CN.TODO_FORM_INPUTS}>
                <input type={'date'} className={CN.TODO_FORM_INPUT} value={date.substring(0, 10)} onChange={onChange} />
            </div>
        </div>
    )
}





interface IFormDate {
    setDateStart: (dateStart: string) => void
    dateStart: string
}

export const FormDate = ({ setDateStart, dateStart }: IFormDate) => {
    const [disabled, setDisabled] = useState(true)

    const onClick = () => {
        setDisabled(!disabled)
    } 
    const onChangeStart = (e : any) => {
        setDateStart(e.target.value)
    }
    // const onChangeEnd = (e : any) => {
    //     setDateEnd(e.target.value)
    // }

    return (
        <div className={CN.TODO_FORM_BOX}>
            <div className={CN.TODO_FORM_INPUTS}>
                <div className={CN.TODO_FORM_LABEL}>Date</div>
                {/* <div className={CS(CN.CLICKABLE, CN.TODO_FORM_ALL_DAY)} onClick={onClick}>Many days</div> */}
            </div>
            <div className={CN.TODO_FORM_INPUTS}>
                <input type={'date'} className={CN.TODO_FORM_INPUT} value={dateStart ? dateStart.substring(0, 10) : ""} onChange={onChangeStart} />
                {/* <input type={'date'} className={CN.TODO_FORM_INPUT} value={dateEnd ? dateEnd.substring(0, 10) : ""} onChange={onChangeEnd} disabled={disabled}/> */}
            </div>
        </div>
    )
}





interface IFormTime {
    setTimeStart: (timeStart: string | null) => void
    timeStart: string | null
    setTimeEnd: (timeEnd: string | null) => void
    timeEnd: string | null
}
export const FormTime = ({ setTimeEnd, setTimeStart, timeEnd, timeStart }: IFormTime) => {
    // const [disabled, setDisabled] = useState(timeStart ? false : true)

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(timeStart) {
            setDisabled(false)
        }
        // console.log("TIME", timeStart)
        // console.log("DIS", disabled)
        // console.log("")
    }, [timeStart])

    const onClick = () => {
        setDisabled(!disabled)
        setTimeStart(null)
        setTimeEnd(null)
    }

    const onChangeStart = (e : any) => {
        setTimeStart(e.target.value)
    }
    const onChangeEnd = (e : any) => {
        setTimeEnd(e.target.value)
    }
    return (
        <div className={CN.TODO_FORM_BOX}>
            <div className={CN.TODO_FORM_INPUTS}>
                <div className={CN.TODO_FORM_LABEL}>Time</div>
                <div className={CS(CN.CLICKABLE, CN.TODO_FORM_ALL_DAY)} onClick={onClick}>All day</div>
            </div>
            
            <div className={CN.TODO_FORM_INPUTS}>
                <input type={'time'} className={CN.TODO_FORM_INPUT} value={timeStart ? timeStart : ""} onChange={onChangeStart} disabled={disabled}/>
                <input type={'time'} className={CN.TODO_FORM_INPUT} value={timeEnd ? timeEnd : ""} onChange={onChangeEnd} disabled={disabled}/>
            </div>
        </div>
    )
}




interface IPrioForm {
    setPrio: (prio: number) => void
    prio: number 
}

export const FormPrio = ({ setPrio, prio }: IPrioForm) => {
    const prios = [TodoPrio.HIGH, TodoPrio.MED, TodoPrio.LOW]
    const onClick = () => {
        setPrio(prio == 2 ? 0 : prio + 1)
    }
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
        <div className={CN.TODO_FORM_BOX}>
            <div className={CN.TODO_FORM_LABEL}>Priority</div>
            <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODO_FORM_BUTTON, PRIOCOLOR())} onClick={() => { onClick() }} >{prios[prio]}</div>
        </div>
    )
}




interface ITypeForm {
    setType: (type: SpecialType) => void
    type: SpecialType 
}

export const FormType = ({ setType, type}: ITypeForm) => {
    const [typeCounter, setTypeCounter] = useState(1)
    const types = [SpecialType.BIRTHDAY, SpecialType.CELEBRATION, SpecialType.HOLIDAY]

    const onClick = () => {
        setTypeCounter(typeCounter == 2 ? 0 : typeCounter + 1)
        setType(types[typeCounter])
    }
    const PRIOCOLOR = () => {
        switch (typeCounter) {
            default:
                return CN.TYPE_HOLI
            case 1:
                return CN.TYPE_BIRTH
            case 2:
                return CN.TYPE_CELEB
        }
    }

    return (
        <div className={CN.TODO_FORM_BOX}>
            <div className={CN.TODO_FORM_LABEL}>Type</div>
            <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODO_FORM_BUTTON, PRIOCOLOR())} onClick={onClick} >{type}</div>
        </div>
    )
}



interface IColorForm {
    setColor: (color: number) => void
    color: number 
}

export const ColorType = ({ setColor, color}: IColorForm) => {
    console.log(color)
    const onClick = () => {
        setColor(color == 4 ? 0 : color + 1)
    }

    const COLOR = () => {
        switch(color) {
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

    return (
        <div className={CN.TODO_FORM_BOX}>
            <div className={CN.TODO_FORM_LABEL}>Type</div>
            <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODO_FORM_BUTTON, COLOR())} onClick={onClick} ></div>
        </div>
    )
}