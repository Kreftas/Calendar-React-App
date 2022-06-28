import { useEffect, useState } from 'react'
import { selectAllEvent } from '../../api/EventApi'
import { EventBoxList } from '../../model/event/EventBox'
import { IEvent, NullEvent } from '../../model/event/EventModel'
import { IList } from './ItemList'

export const EventList = ({ filter, reload, setReload }: IList) => {
    const [eventList, setEventList] = useState<[IEvent]>([NullEvent])

    useEffect(() => {
        selectAllEvent(setEventList)
    }, [filter, reload])

    const Boxes = () => {
        const boxes: any = []
        eventList.map(({ datestart, description, id, timeend, timestart, color }) => {
            if (id != -1) {
                boxes.push(
                    <EventBoxList datestart={datestart} description={description} id={id} timestart={timestart} timeend={timeend} sv={setReload} v={reload} key={id} color={color} />
                )
            }
        })
        return boxes
    }

    return (
        <Boxes />
    )
}
