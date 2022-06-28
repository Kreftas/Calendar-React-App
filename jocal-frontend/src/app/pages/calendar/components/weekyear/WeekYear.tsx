import { SomeBox } from './SomeBox';
import { WeekYearBox } from './WeekYearBox';
import { CalMould } from '../../moulds/calmould/CalMould';
import { setCurrentMonth, setCurrentWeek } from "../../utility/CalendarUtility";
import { StateContext } from "../../CalState";
import { useContext } from "react";


export const WeekYear = () => {
    const stateContext = useContext(StateContext)

    const RenderYearBox = (index: number, row: number) => {
        return (
            <WeekYearBox
                index={index}
                currentMode={setCurrentWeek(stateContext.state, index + 1)}
            />
        )
    }

    const RenderSeasonBox = (index: number) => {
        return (
            <SomeBox
                index={index}
            />
        )
    }

    const texts = []
    for(let i = 0; i < 13; i++ ) {
        texts.push("")
    }

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
