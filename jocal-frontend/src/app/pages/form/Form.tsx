import { useEffect, useState } from 'react'
import { CN, CS } from '../../style/ClassNames'
import { EventForm } from './EventForm'
import { SpecialForm } from './SpecialForm'
import { TodoForm } from './TodoForm'
import { useLocation } from 'react-router-dom';
import { Controls, TypeControls } from "../list/TypeControl"


export enum IFormMode {
    NEW,
    UPDATE
}

export enum EOrigin {
    TODOLIST,
    CALENDAR
}

interface kek {
    back: () => void
    save: () => void
}

export const FormSaveBack = ({ back, save }: kek) => {
    return (
        <div className={CS(CN.TODO_FORM_BOX, CN.TODO_CHANGE_FORM_BUTTONS)}>
            <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODO_FORM_BUTTON, CN.PRIO_MODE_LOW)} onClick={save} >Save</div>
            <div className={CS(CN.BOX_TODO, CN.CLICKABLE, CN.TODO_FORM_BUTTON, CN.MODE_NO_COLOR)} onClick={back} >Back</div>
        </div>
    )
}

export const Form = () => {
    const [mode, setMode] = useState<IFormMode>(IFormMode.NEW)
    const location = useLocation();

    useEffect(() => {
        if(location.state) {
            let form: any = location.state
            setFormState(form.form)
            if(form.data) {
                setMode(IFormMode.UPDATE)            
            }
        }
    }, [])

    const [formState, setFormState] = useState(Controls.TODO);
    const RenderForm = () => {
        switch (formState) {
            default:
                return <TodoForm />
            case Controls.EVENT:
                return <EventForm />
            case Controls.SPECIAL:
                return <SpecialForm />
        }
    }
    return (
        <div className={CN.SLIM}>
            {mode ? <div></div> : <TypeControls filter={formState} setFilter={setFormState}/> }
            <div className={CN.TODO_FORM}>
                <RenderForm />
            </div>
        </div>
    )
}
