import { useContext, useEffect, useState } from "react";
import { selectEventsDay } from "../../../../api/EventApi";
import { selectSpecialsDay } from "../../../../api/SpecialApi";
import { CN, CS } from "../../../../style/ClassNames";
import { StateContext } from "../../CalState";
import { EventBox } from "../hourbox/EventBox";
import { SpecialShelf } from "../hourbox/SpecialShelf";
import { SideDayBox } from "./SideDayBox";
import { ISpecial, NullSpecial } from "../../../../model/special/SpecialModel";
import { IEvent, NullEvent } from "../../../../model/event/EventModel";

interface IDayBox {
    handleClick(): void;
    index: number
}

interface IHourBox {
    rightRef: any,
    leftRef: any,
    calRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
    isSyncingLeftScroll: boolean,
    setSyncingRightScroll: (isSyncingRightScroll: boolean) => void,
    setSyncingLeftScroll: (isSyncingLeftScroll: boolean) => void
}

export const DayBox = ({ handleClick, index, calRefs, isSyncingLeftScroll, leftRef, rightRef, setSyncingLeftScroll, setSyncingRightScroll }: IDayBox & IHourBox) => {
    const stateContext = useContext(StateContext)
    const [specialList, setSpecialList] = useState<[ISpecial]>([NullSpecial])
    const [eventList, setEventList] = useState<[IEvent]>([NullEvent])

    useEffect(() => {
        selectSpecialsDay({ setList: setSpecialList, month: stateContext.state.month + 1, day: stateContext.state.day })
        selectEventsDay({ setList: setEventList, day: stateContext.state.day, month: stateContext.state.month + 1, year: stateContext.state.year })
    }, [stateContext])

    const PartBoxes = () => {
        const boxes = []
        for (let i = 0; i < 24; i++) {
            boxes.push(
                <EventBox eventList={eventList} i={i} key={i} day={stateContext.state.day} year={stateContext.state.year} month={stateContext.state.month} />
            )
        }
        return (
            <>
                {boxes}
            </>
        )
    }

    const leftScroll = () => {
        const ref = calRefs.current[0]
        rightRef.current.scrollTop = ref ? ref.scrollTop : 0;
    }

    return (
        <>
            <div className={CS(CN.BOX_CAL, CN.CONTENTBOX, CN.HOUR_BOX)} onClick={handleClick}>
                <div className={CS(CN.HOUR_TOP, CN.SIDE_HOUR_BOX)}>
                    <SpecialShelf specialList={specialList} />
                </div>
                <div className={CN.HOUR_PARTBOX} ref={el => calRefs.current[0] = el} onScroll={leftScroll}>
                    <PartBoxes />
                </div>
            </div>

            <div className={CS(CN.BOX_CAL, CN.CONTENTBOX, CN.DAY_SIDEBOX)}>
                <SideDayBox eventList={eventList} />
            </div>
        </>
    )
}

