import React, { useContext } from 'react'
import { CalMode } from '../../../../model/calendar/CalendarModel';
import { CN, CS } from '../../../../style/ClassNames'
import { StateContext } from '../../CalState';

interface ILifeBox {
    index: number;
    currentMode: string;
    startDec: number
    year: number
}


export const LifeBox = ({ year, startDec, index, currentMode }: ILifeBox) => {
    const stateContext = useContext(StateContext)

    const onClick = () => {
        stateContext.setState({
            year: year,
            mode: CalMode.YEAR,
        })
    }
    return (
        <div className={CS(CN.BOX_CAL, CN.CLICKABLE, currentMode, CN.CONTENTBOX)} onClick={onClick}>
            {year}
        </div>
    )
}
