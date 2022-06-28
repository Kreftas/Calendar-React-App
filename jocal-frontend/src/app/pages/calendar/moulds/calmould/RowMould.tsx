import { CN } from "../../../../style/ClassNames";
import { ColumnMould } from "./ColumnMould";

interface IRow {
    size: number;
    index: number;
    columns: number;
}

export const Row = (props: IRow) => {
    const divstyle = {
        height: props.size + "%"
    }
    return (
        <div className={CN.BOXMOULD} style={divstyle}>
            <ColumnMould columns={props.columns} row={props.index} />
        </div>
    )
}

interface IRowMould {
    rows: number
    columns: number
}

export const RowMould = (props: IRowMould) => {
    let height = (1 / (props.rows)) * 100
    const boxes = []
    for (let i = 0; i < props.rows; i++) {
        boxes.push(
            <Row  size={height} index={i} columns={props.columns} key={i} />
        )
    }
    return (
        <div className={CN.ROWMOULD}>
           {boxes}
        </div>
    )
}

