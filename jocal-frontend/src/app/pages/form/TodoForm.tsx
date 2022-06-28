import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { insertTodo, updateTodo } from '../../api/TodoApi'
import { Controls } from '../list/TypeControl'
import { EOrigin, FormSaveBack, IFormMode } from './Form'
import { FormDescription, FormPrio } from './FormComponents'
import { onFail, onSuccess as onSuccess } from './FormGuard'


export const TodoForm = () => {
    const [mode, setMode] = useState<IFormMode>(IFormMode.NEW)
    const [desc, setDesc] = useState<string>("")
    const [prio, setPrio] = useState<number>(0)
    const [id, setId] = useState<number>(-1)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            let locState: any = location.state
            if (locState.data) {
                setMode(IFormMode.UPDATE)
                let data: any = locState.data
                setDesc(data.description)
                setPrio(data.prio)
                setId(data.id)
            }
        }
    }, [])

    function onSave() {
        if (desc.length == 0) {
            alert("Please enter a description")
            return
        }
        
        if (mode == IFormMode.NEW) {
            insertTodo({
                description: desc,
                prio: prio,
                onFail: () => onFail(),
                onSuccess: () => onSuccess(navigate, Controls.TODO, EOrigin.TODOLIST)
            })
        } else {
            updateTodo({
                id: id,
                description: desc,
                prio: prio,
                onFail: () => onFail(),
                onSuccess: () => onSuccess(navigate, Controls.TODO, EOrigin.TODOLIST)
            })
        }
    }

    return (
        <>
            <FormDescription setDesc={setDesc} desc={desc} />
            <FormPrio setPrio={setPrio} prio={prio} />
            <FormSaveBack back={() => { onSuccess(navigate, Controls.TODO, EOrigin.TODOLIST) }} save={() => { onSave() }} />
        </>
    )
}
