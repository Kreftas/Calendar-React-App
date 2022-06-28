import React, { useEffect, useRef } from 'react'
import { CN, CS } from '../../../../style/ClassNames'



interface IHourBox {
    rightRef: any,
    leftRef: any,
    calRefs: any,
    isSyncingRightScroll: boolean,
    setSyncingRightScroll: (isSyncingRightScroll: boolean) => void,
    setSyncingLeftScroll: (isSyncingLeftScroll: boolean) => void
}

export const HourBox = ({ isSyncingRightScroll, calRefs, rightRef, setSyncingLeftScroll, setSyncingRightScroll }: IHourBox) => {
    const scrollToRef: any = useRef(null)

    useEffect(() => {
        // Check if all refs are assigned
        if (rightRef.current && calRefs.current[calRefs.current.length - 1] && scrollToRef.current) {
            // For each ref in ref-list
            for (let i = 0; i < calRefs.current.length; i++) {
                calRefs.current[i].scrollTop = scrollToRef.current.offsetTop;
            }
            rightRef.current.scrollTop = scrollToRef.current.offsetTop
        }
    }, [])

    const makeTime = (hour: number) => {
        if (hour < 10) {
            return "0" + hour + ":00"
        } else {
            return hour + ":00"
        }

    }

    const PartBoxes = () => {
        const boxes = []
        for (let i = 0; i < 24; i++) {
            if (i == 7) {
                boxes.push(<div className={CN.HOUR_PART} ref={scrollToRef} key={i}>{makeTime(i)}</div>)
            } else {
                boxes.push(<div className={CN.HOUR_PART} key={i}>{makeTime(i)}</div>)
            }
        }
        return (
            <>
                {boxes}
            </>
        )
    }

    const rightScroll = () => {
        for (let i = 0; i < calRefs.current.length; i++) {
            calRefs.current[i].scrollTop = rightRef.current.scrollTop;
        }

        // if (!isSyncingRightScroll) {
        //     setSyncingLeftScroll(true);
        //     for (let i = 0; i < calRefs.current.length; i++) {
        //         calRefs.current[i].scrollTop = rightRef.current.scrollTop;
        //     }
        // }
        // setSyncingRightScroll(false);
    }

    return (
        <div className={(CS(CN.BOX_CAL, CN.ROWBOX, CN.HOUR_BOX))} >
            <div className={CS(CN.HOUR_TOP, CN.SIDE_HOUR_BOX)}></div>
            
            <div className={CN.HOUR_PARTBOX} ref={rightRef} onScroll={() => rightScroll()}>
                <PartBoxes />
            </div>
        </div>
    )
}
