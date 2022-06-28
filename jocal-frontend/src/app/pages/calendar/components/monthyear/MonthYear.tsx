import { SeasonBox } from './SeasonBox';
import { MonthYearBox } from './MonthYearBox';
import { CalMould } from '../../moulds/calmould/CalMould';
import { setCurrentMonth } from "../../utility/CalendarUtility";
import { StateContext } from "../../CalState";
import { useContext } from "react";


export const MonthYear = () => {
    const stateContext = useContext(StateContext)
    const RenderYearBox = (index: number, row: number) => {
        return (
            <MonthYearBox
                index={index}
                currentMode={setCurrentMonth(stateContext.state, index)}
            />
        )
    }

    const RenderSeasonBox = (index: number) => {
        return (
            <SeasonBox
                index={index}
            />
        )
    }

    const texts = ["", "", ""]
    return (
        <CalMould
            rows={4}
            columns={texts.length}
            text={texts}
            renderContentBox={RenderYearBox}
            renderSideBox={RenderSeasonBox}
            renderColumnBar={true}
        />
    )
}
