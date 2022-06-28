import { CN } from "../../../../style/ClassNames"
import { RenderContentContext } from "./CalMould"
import { useContext } from "react";

interface IColumn {
    size: number;
    index: number;
    row: number;
}

export const Column = ({index, size, row} : IColumn) => {
    const renderContext = useContext(RenderContentContext)
    const divstyle = {
        width: size + "%"
    }
    return (
        <div className={CN.BOXMOULD} style={divstyle}>
            {renderContext ? renderContext(index, row) : <div>kek</div>}
        </div>
    )
}

interface IColumnMould {
    row: number
    columns: number
}

function calcIndex(row: number, col: number, cols: number) {
    return row * cols + col
}

export const ColumnMould = ({columns, row} : IColumnMould) => {
    let width = (1 / (columns)) * 100
    const boxes = []
    for (let col = 0; col < columns; col++) {
        boxes.push(
            <Column index={calcIndex(row, col, columns)} size={width} row={row} key={col}/>
        )
    }
    return (
        <div className={CN.COLUMNMOULD}>
            {boxes}
        </div>
    )
}
