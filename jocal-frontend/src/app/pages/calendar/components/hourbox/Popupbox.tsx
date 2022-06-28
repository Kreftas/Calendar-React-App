import { EventBoxPopUp } from "../../../../model/event/EventBox"
import { SpecialBoxPopUp } from "../../../../model/special/SpecialBox"
import { IEvent } from "../../../../model/event/EventModel";
import { ISpecial } from "../../../../model/special/SpecialModel";
import { CN, CS } from "../../../../style/ClassNames"



interface IPopupBox {
    eventList: Array<IEvent>; 
    specialList: Array<ISpecial>;

}

interface IMonthPopupBox extends IPopupBox {
    day: number
    row: number
}

export const MonthPopupBox = ({day, eventList, specialList, row} : IMonthPopupBox) => {
    const boxes: any = []
    const boxes1: any = []

    eventList.map(({ timestart, timeend, description, datestart, id, color }) => {
        if (parseInt(datestart.substring(8, 10)) == day) {
            boxes.push(
                <EventBoxPopUp color={color} datestart={datestart} description={description} id={id} timeend={timeend} timestart={timestart} key={id} />
            )
        }
    })

    specialList.map(({date, description, id, type})=> {
        if (parseInt(date.substring(8, 10)) == day) {
            boxes1.push(
                <SpecialBoxPopUp date={date} type={type} description={description} id={id} key={id} />
            )
        }

    })

    const TopOrBottom = () => {
        if(row < 3) {
            return CN.MODE_POPUP_TOP
        } else {
            return CN.MODE_POPUP_BOTTOM
        }
    }

    return (
        <div className={CS(CN.MONTH_POPUP_BOX, TopOrBottom())}>
            {boxes}
            {boxes1}
        </div>
    )
}


export const PopupBox = ({ eventList, specialList }: IPopupBox) => {
    const boxes: any = []
    const boxes1: any = []

    eventList.map(({ timestart, timeend, description, datestart, id, color }) => {
        if (timestart == null && timeend == null) {
            boxes.push(
                <EventBoxPopUp color={color} datestart={datestart} description={description} id={id} timeend={timeend} timestart={timestart} key={id} />
            )
        }
    })

    specialList.map(({date, description, id, type})=> {
        boxes1.push(
            <SpecialBoxPopUp date={date} type={type} description={description} id={id} key={id} />
        )
    })

    return (
        <div className={CN.WEEK_POPUP_BOX}>
            {boxes}
            {boxes1}
        </div>
    )
}