
import { ISpecial, SpecialType } from '../../../../model/special/SpecialModel';
import { CN } from '../../../../style/ClassNames';


interface ISpecialDecore {
    specialList: Array<ISpecial>;
}

interface IMonthSpecialDecore extends ISpecialDecore {
    day: number
}

export const MonthSpecialDecore = ({ specialList, day }: IMonthSpecialDecore) => {
    const boxes = []
    let key = 0
    for (let special of specialList) {
        if (parseInt(special.date.substring(8, 10)) == day) {
            boxes.push(<SpecialDecoreBox type={special.type} key={key} />)
        }
        key++
    }
    return (
        <>
            {boxes}
        </>
    )
}

export const SpecialDecore = ({ specialList }: ISpecialDecore) => {

    const boxes = []
    let key = 0
    for (let special of specialList) {
        boxes.push(<SpecialDecoreBox type={special.type} key={key} />)
        key++
    }

    return (
        <>
            {boxes}
        </>
    )
}

interface ISpecialDecoreBox {
    type: SpecialType
    key: number
}

const SpecialDecoreBox = ({ type, key }: ISpecialDecoreBox) => {

    const TYPECOLOR = (type: SpecialType) => {
        switch (type) {
            case SpecialType.BIRTHDAY:
                return CN.DECORE_SPECIAL_BIRTH
            case SpecialType.CELEBRATION:
                return CN.DECORE_SPECIAL_CELEB
            case SpecialType.HOLIDAY:
                return CN.DECORE_SPECIAL_HOLI
            case SpecialType.NONE:
                return ""
            default:
                return ""
        }
    }

    return (
        <div className={TYPECOLOR(type)} key={key}></div>
    )
}

