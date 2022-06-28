import { createContext } from "react";
import { CN } from "../../../../style/ClassNames"
import { ColumnBar } from "../calbar/ColumnBar"
import { RowBar } from "../calbar/RowBar"
import { RowMould } from "./RowMould";



interface ICalMould {
    text: string[] | number[];
    rows: number;
    columns: number;
    renderContentBox: (index: number, row : number) => React.ReactNode;
    renderSideBox: (index: number) => React.ReactNode;
    renderColumnBar: boolean;
}

type TContext = { (index: number, row : number): React.ReactNode; }
export const RenderContentContext = createContext<TContext | null>(null)
export const RenderSideContext = createContext<TContext | null>(null)

export const CalMould = ( {rows, columns, text, renderContentBox, renderSideBox, renderColumnBar} : ICalMould) => {
    return (
        <>
            {renderColumnBar ? <ColumnBar texts={text} /> : <></> } 
            <div className={CN.CAL}>
                <RenderSideContext.Provider value={renderSideBox} >
                    <RowBar nbrBoxes={rows} />
                </RenderSideContext.Provider>
                <RenderContentContext.Provider value={renderContentBox} >
                    <RowMould columns={columns} rows={rows} />
                </RenderContentContext.Provider>
            </div>
        </>
    )
}
