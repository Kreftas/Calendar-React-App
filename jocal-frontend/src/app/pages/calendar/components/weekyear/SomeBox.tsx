import React from 'react'
import { CN, CS } from '../../../../style/ClassNames'

interface ISeasonBox {
    index: number
}

export const SomeBox = ({ index }: ISeasonBox) => {
    return (
        <div className={CS(CN.BOX_CAL, CN.ROWBOX)}>
            SeasonBox
        </div>
    )
}
