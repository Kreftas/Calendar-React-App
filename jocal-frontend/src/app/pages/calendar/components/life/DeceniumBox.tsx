import React from 'react'
import { CN, CS } from '../../../../style/ClassNames'

interface ICenturyBox {
    startDec: number
    index: number
}


export const DeceniumBox = ({startDec ,index }: ICenturyBox) => {
    return (
        <div className={CS(CN.BOX_CAL, CN.ROWBOX)}>
            {startDec - (index * 10)}
        </div>
    )
}
