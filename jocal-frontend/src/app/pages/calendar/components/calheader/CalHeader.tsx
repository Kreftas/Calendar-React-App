import { Months, CalMode, CalState, UpdateCalState, CalModes, ICal } from '../../../../model/calendar/CalendarModel';
import { StateContext } from '../../CalState';
import { CN, CS } from '../../../../style/ClassNames';
import { useContext } from 'react';


function getInfo(state: CalState, mode: number) {
    switch (mode) {
        case CalMode.LIFE:
            return "Life"
        case CalMode.YEAR:
            return state.year
        case CalMode.WEEKYEAR:
            return state.year
        case CalMode.MONTH:
            return Object.values(Months).at(state.month)
        case CalMode.WEEK:
            return "w" + state.week
        case CalMode.DAY:
            return state.day
        default:
            return "Error"
    }
}

interface ICalHeader extends ICal { }

export const CalHeader = () => {
    const stateContext = useContext(StateContext)

    function handleClick(mode: number) {
        if(stateContext.state.mode == CalMode.WEEK && mode == CalMode.YEAR) {
            stateContext.setState({
                mode: CalMode.WEEKYEAR
            })
        } else {
            stateContext.setState({
                mode: mode
            })
        }
    }

    function handleYearClick() {
        if (stateContext.state.mode == CalMode.YEAR) {
            handleClick(CalMode.WEEKYEAR)
        } else {
            handleClick(CalMode.YEAR)
        }

    }

    function render(state: CalState) {
        const headerButtons: React.ReactNode[] = []
        let enumModes = Object.values(CalMode)
        enumModes.splice(0, 6)
        let modes: CalMode[] = enumModes.map(Number)
        modes.splice(CalMode.WEEKYEAR, 1)
        for (let i = 0; modes[i] <= state.mode; i++) {
            const mode = modes[i]
            if (mode === CalMode.YEAR && (state.mode == CalMode.YEAR || state.mode == CalMode.WEEKYEAR)) {
                headerButtons.push(<DoubleButton state={state} mode={mode} key={i}/>)
            } else if (mode === state.mode) {
                headerButtons.push(<CurrentButton state={state} mode={mode} key={i} />)
            } else {
                headerButtons.push(<ActiveButton state={state} mode={mode} key={i}/>)
            }
        }
        return headerButtons;
    }

    interface IHeaderButton {
        state: CalState,
        mode: CalMode
    }

    const CurrentButton = ({ mode, state }: IHeaderButton) => {
        return (
            <div className={CN.CALHEADBUTTON + " " + CN.CALHEADACTIVE}>
                {getInfo(state, mode)}
            </div>
        )
    }

    const ActiveButton = ({ mode, state }: IHeaderButton) => {
        return (
            <div className={CS(CN.CALHEADBUTTON, CN.CLICKABLE)} onClick={() => { handleClick(mode) }} >
                {getInfo(state, mode)}
            </div>
        )
    }

    const DoubleButton = ({ mode, state }: IHeaderButton) => {
        return (
            <div className={CS(CN.CALHEADBUTTON, CN.CLICKABLE, CN.CALHEADDOUBLE)} onClick={() => { handleYearClick() }} >
                {getInfo(state, mode)}
            </div>
        )
    }

    return (
        <div className={CN.CALHEADER}>
            {render(stateContext.state)}

            {/* Only to show current state */}
            {/* {stateContext.state.year}-
            {stateContext.state.month}-
            {stateContext.state.week}-
            {stateContext.state.day}-
            {CalModes[stateContext.state.mode]} */}
        </div>
    )
}
