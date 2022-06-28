
import { HourTopSpecialBox} from '../../../../model/special/SpecialBox'
import { ISpecial } from '../../../../model/special/SpecialModel';


interface ISpecialShelf {
    specialList: Array<ISpecial>;
}
export const SpecialShelf = ({ specialList }: ISpecialShelf) => {
    const boxes: any = []

    if (specialList.length < 1) {
        boxes.push(
            <></>
        )
    } else {
        specialList.map(({ date, description, id, type }) => {
            boxes.push(
                <HourTopSpecialBox date={date} description={description} id={id} type={type} key={id} />
            )
        })
    }

    return (
        <>
            {boxes}
        </>
    )

}