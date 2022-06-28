import { useEffect, useState } from 'react'
import { selectAllSpecials } from '../../api/SpecialApi'
import { SpecialBoxList } from '../../model/special/SpecialBox'
import { ISpecial, NullSpecial } from '../../model/special/SpecialModel'
import { IList } from './ItemList'



export const SpecialList = ({filter, reload, setReload} : IList) => {
    const [specialList, setSpecialList] = useState<[ISpecial]>([NullSpecial])
    
    useEffect(() => {
        selectAllSpecials(setSpecialList)
    }, [filter, reload])

    const Boxes = () => {
        const boxes: any = []
        specialList.map(({ id, date, description, type }) => {
            if (id != -1) {
                boxes.push(
                    <SpecialBoxList id={id} description={description} date={date} type={type} sv={setReload} v={reload} key={id} />
                )
            }
        })
        return boxes
    }

    return (
        <Boxes />
    )
}
