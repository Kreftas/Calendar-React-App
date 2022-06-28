import { useNavigate } from "react-router-dom"
import { CN, CS } from "../../../../style/ClassNames"
import { EOrigin, IFormMode } from "../../../form/Form"
import { Controls } from "../../../list/TypeControl"
import { MakeADate, MakeATime } from "../../utility/CalendarUtility"
import { IWeekDate } from "../week/WeekBox"
import { IEvent } from "../../../../model/event/EventModel"


interface IEventBox {
    i: number
    eventList: [IEvent]
    year: number,
    month: number,
    day: number

}
export const EventBox = ({ i, eventList, day, month, year }: IEventBox) => {
    const navigate = useNavigate();

    const onClick = (event: IEvent | null) => {
        navigate("../add", {
            replace: true, state: {
                form: Controls.EVENT,
                formMode: IFormMode.UPDATE,
                origin: EOrigin.CALENDAR,
                data: {
                    dateStart: event?.datestart,
                    description:  event?.description,
                    timeEnd:  event?.timeend,
                    timeStart:  event?.timestart,
                    id:  event?.id,
                    color: event?.color
                }
            }
        })
    }

    const TypeColor = (color: number) => {
        console.log(evencolor)
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
    

    const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        // console.log(i)
        // console.log(MakeATime(i))
        navigate("../add", {
            replace: true, state: {
                form: Controls.EVENT,
                origin: EOrigin.CALENDAR,
                formMode: IFormMode.NEW,
                data: {
                    dateStart: MakeADate(year, month, day),
                    timeStart: MakeATime(i),
                    color: 0
                }
            }
        })
    }

    const handeOnEventContextMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        
        navigate("../add", {
            replace: true, state: {
                form: Controls.EVENT,
                origin: EOrigin.CALENDAR,
                formMode: IFormMode.NEW,
                data: {
                    dateStart: MakeADate(year, month, day)
                }
            }
        })
    }


    let top = 0
    let height = 0
    let evendesc = ""
    let evencolor = 0
    let shouldReturn = false
    let event: IEvent | null = null
    
    eventList.map(({ timestart, timeend, description, datestart, id, color }) => {
        if(timestart && timeend) {
            const timestart_h = parseInt(timestart.substring(0, 2))
            const timestart_m = parseInt(timestart.substring(3, 5))
            const timeend_h = parseInt(timeend.substring(0, 2))
            const timeend_m = parseInt(timeend.substring(3, 5))
            if (timestart_h == i) {
                shouldReturn = true
                evendesc = description
                evencolor = color
                let total_h = timeend_h - timestart_h
                let total_m = timeend_m - timestart_m
                total_m = total_m / 60
                total_h += total_m
                height = (total_h * 100) - 5
                top = (timestart_m / 60) * 100
    
                event = {
                    color: color,
                    datestart: datestart,
                    description: description,
                    id: id,
                    timeend: timeend, 
                    timestart: timestart,
                }
            }
        }
    })
    const style = {
        top: top + "%",
        height: height + "%"
    }
    if (shouldReturn && event) {
        return (
            <div className={CN.HOUR_PART} key={i}>
                <div className={CS(CN.EVENT_BOX, CN.CLICKABLE, TypeColor(evencolor))} key={1} style={style} onClick={() => onClick(event)}>{evendesc}</div>
            </div>
        )
    } else {
        return (
            <div className={CS(CN.HOUR_PART, CN.HOVERABLE, "noborder")} key={i} onContextMenu={handleContextMenu}>
                {/* <div className={CN.EVENT_BOX} key={1} style={style}>{evendesc}</div> */}
            </div>
        )
    }
}