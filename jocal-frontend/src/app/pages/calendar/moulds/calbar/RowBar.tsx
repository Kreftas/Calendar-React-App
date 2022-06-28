import { useContext } from "react"
import { CN } from "../../../../style/ClassNames"
import { RenderSideContext } from "../calmould/CalMould"

interface RowBarBoxProps {
    size: number
    index: number
}

const RowBarBox = ({index, size}: RowBarBoxProps) => {
    const renderContext = useContext(RenderSideContext)
    const divstyle = {
        height: size + "%"
    }
    return (
        <div className={CN.ROWBARBOX} style={divstyle}>
             {renderContext ? renderContext(index, index) : <div>kek</div>}
        </div>
    )
}

interface RowBarProps {
    nbrBoxes: number
}

export const RowBar = ({nbrBoxes} : RowBarProps) => {
    const size = (1 / (nbrBoxes)) * 100
    const boxes = []
    for (let i = 0; i < nbrBoxes; i++) {
        boxes.push(
            <RowBarBox size={size} index={i} key={i} />
        )
    }
    return (
        <div className={CN.ROWBAR}>
            {boxes}
        </div>
    )
}
