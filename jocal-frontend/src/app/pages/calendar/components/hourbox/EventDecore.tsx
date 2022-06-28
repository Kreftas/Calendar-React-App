import { IEvent } from '../../../../model/event/EventModel';
import { CN, CS } from '../../../../style/ClassNames';


interface IEventDecore {
    eventList: Array<IEvent>;
}

enum ECounterCal {
    DAY,
    WEEK,
    MONTH
}

export const WeekEventDecore = ({ eventList }: IEventDecore) => {
    let count = 0
    eventList.map(({ timestart, timeend, id }) => {
        if (id != -1 && timestart == null && timeend == null) {
            count++
        }
    })
    return (
        <EventCounter count={count} cal={ECounterCal.WEEK}/>
    )
}

export const DayEventDecore = ({ eventList }: IEventDecore) => {
    let count = 0
    eventList.map(({ timestart, timeend, id }) => {
        if (id != -1 && timestart == null && timeend == null) {
            count++
        }
    })
    return (
        <EventCounter count={count} cal={ECounterCal.DAY} />
    )
}


interface IMonthEventDecore extends IEventDecore {
    day: number
}

export const MonthEventDecore = ({ eventList, day }: IMonthEventDecore) => {
    let count = 0
    eventList.map(({ datestart }) => {
        if (parseInt(datestart.substring(8, 10)) == day) {
            count++
        }
    })

    return (
        <EventCounter count={count} cal={ECounterCal.MONTH} />
    )
}

interface ICounter {
    count: number
    cal: ECounterCal
}
const EventCounter = ({ count, cal }: ICounter) => {

    const CALDECORE = () => {
        switch (cal) {
            case ECounterCal.DAY:
                return CN.DECORE_EVENT_DAY
            case ECounterCal.MONTH:
                return CN.DECORE_EVENT_MONTH
            case ECounterCal.WEEK:
                return CN.DECORE_EVENT_WEEK
            default:
                return CN.DECORE_EVENT_MONTH
        }
    }


    return (
        <>
            {count > 0 ? <div className={CS(CN.DECORE_EVENT, CALDECORE())}>{count}</div> : <></>}
        </>
    )
}
