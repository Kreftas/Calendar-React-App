import React from 'react'
import { EventBox, EventBoxDaySide, EventBoxPopUp } from '../../../../model/event/EventBox';
import { IEvent } from '../../../../model/event/EventModel';



interface ISideDayBox {
    eventList: Array<IEvent>;
}
export const SideDayBox = ({eventList} : ISideDayBox) => {


    const RenderBoxes = () => {
        const boxes: any = []
        eventList.map(({ timestart, timeend, description, datestart, id, color }) => {
            if (timestart == null && timeend == null) {
                boxes.push(
                    <EventBoxDaySide color={color} datestart={datestart} description={description} id={id} timeend={timeend} timestart={timestart} key={id} />
                )
            }
        })

        return boxes

    }

    return (
            <RenderBoxes />
    )
}
