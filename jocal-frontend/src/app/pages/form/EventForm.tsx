import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { insertEventTime, updateEventTime } from '../../api/EventApi'
import { Controls } from '../list/TypeControl'
import { EOrigin, FormSaveBack, IFormMode } from './Form'
import { ColorType, FormDate, FormDescription, FormTime } from './FormComponents'
import { onFail, onSuccess } from './FormGuard'

export const EventForm = () => {
    const [mode, setMode] = useState<IFormMode>(IFormMode.NEW)
    const [id, setId] = useState<number>(-1)
    const [color, setColor] = useState<number>(0)
    const [desc, setDesc] = useState<string>("")
    const [dateStart, setDateStart] = useState<string>("")
    const [timeStart, setTimeStart] = useState<string | null>(null)
    const [timeEnd, setTimeEnd] = useState<string | null>(null)
    const [origin, setOrigin] = useState<EOrigin>(EOrigin.TODOLIST)
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (location.state) {
            let locState: any = location.state
            setOrigin(locState.origin)
            setMode(locState.formMode)
            if (locState.data) {
                let data: any = locState.data
                setDesc(data.description)
                setDateStart(data.dateStart)
                setTimeStart(data.timeStart)
                setTimeEnd(data.timeEnd)
                setId(data.id)
                setColor(data.color)
            }
        }
    }, [])

    function onSave() {
        if (desc.length == 0) {
            alert("Please enter a description")
            return
        }
        if (dateStart.length == 0) {
            alert("Please enter a date")
            return
        }

        console.log(timeEnd)

        if (timeStart && timeStart.length == 0) {
            setTimeStart("00:00")
            setTimeEnd("23:59")
        } else if (timeStart && !timeEnd) {
            alert("Please enter a end time")
            return
        }

        if (mode == IFormMode.NEW) {
            console.log("ADDING EVENT!")
            insertEventTime({
                desc: desc,
                dateStart: dateStart,
                timeStart: timeStart,
                timeEnd: timeEnd,
                onFail: () => { onFail() },
                onSuccess: () => { onSuccess(navigate, Controls.EVENT, origin) },
                color: color
            })
        } else {
            console.log("UPDATING EVENT!")
            updateEventTime({
                id: id,
                desc: desc,
                dateStart: dateStart,
                timeStart: timeStart,
                timeEnd: timeEnd,
                onFail: () => { onFail() },
                onSuccess: () => { onSuccess(navigate, Controls.EVENT, origin) },
                color: color
            })
        }
    }

    return (
        <>
            <FormDescription setDesc={setDesc} desc={desc} />
            <FormDate setDateStart={setDateStart} dateStart={dateStart} />
            <FormTime setTimeStart={setTimeStart} setTimeEnd={setTimeEnd} timeEnd={timeEnd} timeStart={timeStart} />
            <ColorType  color={color} setColor={setColor}/>
            <FormSaveBack back={() => { onSuccess(navigate, Controls.EVENT, origin) }} save={() => { onSave() }} />
        </>
    )
}
