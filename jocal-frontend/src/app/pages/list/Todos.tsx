import { useState } from 'react'
import { CN } from '../../style/ClassNames'
import { OldTodoList } from './ItemList'
import { Controls, TypeControls } from './TypeControl'



export const Todos = () => {
    const [filter, setFilter] = useState(Controls.TODO)

    return (
        <div className={CN.SLIM}>
            <TypeControls
                filter={filter}
                setFilter={setFilter}
            />
            <OldTodoList 
                filter={filter}
                setFilter={setFilter}
            />
        </div>
    )
}
