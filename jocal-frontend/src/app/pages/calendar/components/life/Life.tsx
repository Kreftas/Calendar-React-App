import { CalMould } from '../../moulds/calmould/CalMould'
import { getCurrentDecennium, getCurrentYear, setCurrentYear } from '../../utility/CalendarUtility'
import { DeceniumBox } from './DeceniumBox'
import { LifeBox } from './LifeBox'

export const Life = () => {
    const startYear = getCurrentYear()
    const startDec = getCurrentDecennium() + 20


    const RenderLifeBox = (index: number, row: number) => {
        const year = startDec - row * 10 + (index - row * 10)
        return (
            <LifeBox
                index={index}
                year={year}
                startDec={startDec}
                currentMode={setCurrentYear(year)}
            />
        )
    }

    const RenderCenturyBox = (index: number) => {
        return (
            <DeceniumBox
                index={index}
                startDec={startDec}
            />
        )
    }

    const texts = []
    for(let i = 0; i < 10; i++ ) {
        texts.push("")
    }

    return (
        <CalMould
            rows={6}
            columns={texts.length}
            text={texts}
            renderContentBox={RenderLifeBox}
            renderSideBox={RenderCenturyBox}
            renderColumnBar={true}
        />
    )
}
