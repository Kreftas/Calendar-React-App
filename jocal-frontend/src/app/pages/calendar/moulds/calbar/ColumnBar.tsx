import { CN, CS } from "../../../../style/ClassNames"


interface IColumnBarBox {
    text?: string | number,
    size?: number
}

const ColumnBarBox = (props: IColumnBarBox) => {
    const divstyle = {
        width: props.size + "%"
    }
    return (
        <div className={CS(CN.BOX_CAL, CN.COLUMNBOX)} style={divstyle}>
            <p>{props.text}</p>
        </div>
    )
}

const StartBox = () => {
    return (
        <div className={CS(CN.BOX_CAL, CN.COLUMNBOX)}></div>
    )
}

interface IColumnBar {
    texts: string[] | number[]
}

export const ColumnBar = ({ texts }: IColumnBar) => {
    const size = (1 / (texts.length)) * 100
    const boxes = []
    for (let i = 0; i < texts.length; i++) {
        boxes.push(
            <ColumnBarBox text={texts[i]} size={size} key={i} />
        )
    }
    return (
        <div className={CN.COLUMNBAR}>
            <div className={CN.COLUMNBARSTART}>
                <StartBox />
            </div>
            <div className={CN.COLUMNBARBOXES}>
                {boxes}
            </div>
        </div>
    )
}
