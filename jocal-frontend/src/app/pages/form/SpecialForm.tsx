import { useEffect, useState } from 'react'
import { insertSpecial, updateSpecial } from '../../api/SpecialApi'
import { EOrigin, FormSaveBack, IFormMode } from './Form'
import { FormDateSingle, FormDescription, FormType } from './FormComponents'
import { onFail, onSuccess } from './FormGuard'
import { useLocation, useNavigate } from "react-router-dom";
import { Controls } from '../list/TypeControl'
import { SpecialType } from '../../model/special/SpecialModel'

export const SpecialForm = () => {
    const [id, setId] = useState<number>(-1)
    const [mode, setMode] = useState<IFormMode>(IFormMode.NEW)
    const [desc, setDesc] = useState<string>("")
    const [type, setType] = useState<SpecialType>(SpecialType.BIRTHDAY)
    const [date, setDate] = useState<string>("")
    const [origin, setOrigin] = useState<EOrigin>(EOrigin.TODOLIST)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            let locState: any = location.state
            if (locState.data) {
                setMode(IFormMode.UPDATE)
                let data: any = locState.data
                setDesc(data.description)
                setType(data.type)
                setDate(data.date)
                setId(data.id)
                setOrigin(data.origin)
            }
        }
    }, [])

    function onSave() {
        if (desc.length == 0) {
            alert("Please enter a description")
            return
        }
        if (date.length == 0) {
            alert("Please enter a date")
            return
        }

        if (mode == IFormMode.NEW) {
            insertSpecial({
                description: desc,
                date: date,
                type: type,
                onFail: () => onFail(),
                onSuccess: () => onSuccess(navigate, Controls.SPECIAL, origin)
            })
        } else {
            updateSpecial({
                id: id,
                description: desc,
                date: date,
                type: type,
                onFail: () => onFail(),
                onSuccess: () => onSuccess(navigate, Controls.SPECIAL, origin)
            })
        }
    }

    return (
        <>
            <FormDescription setDesc={setDesc} desc={desc} />
            <FormDateSingle setDate={setDate} date={date} />
            <FormType type={type} setType={setType} />
            <FormSaveBack back={() => { onSuccess(navigate, Controls.SPECIAL, origin) }} save={() => { onSave() }} />
        </>
    )
}
