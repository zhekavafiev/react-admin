import {useState} from "react";
import './Counter.css'

interface CounterProps {
    step: number,
    text: string,
    command: string,
    min?: number,
    max?: number
}

function Counter({step, text, command, min = -20, max = 20}: CounterProps) {
    const [count, setCount] = useState(0)

    return <div className="counter__counter">
        <button
            className={getButtonClass(count, max, min)}
            onClick={() => MakeStep({count, step, setCount, min, max})}
        >
            {text}: {count}
        </button>

        <button
            className="counter__counter-btn"
            onClick={() => ResetValue({value: 0, setCount: setCount})}
        >
            Сброс
        </button>
        <p className="counter__counter-desc">
            {command}
        </p>
    </div>
}

function MakeStep({count, step, setCount, min, max}) {
    if (step > 0) {
        return MakeStepForward({count, step, setCount, max})
    } else {
        return MakeStepBackward({count, step, setCount, min})
    }
}

function MakeStepForward({count, step, setCount, max}) {
    return count < max ? setCount(count + step) : setCount(max)
}

function MakeStepBackward({count, step, setCount, min}) {
    return count > min ? setCount(count + step) : setCount(min)
}

function ResetValue({value, setCount}) {
    return setCount(value)
}

function getButtonClass(count, max, min) {
    let baseClass = "counter__counter-btn";

    if (count === max) {
        baseClass = "counter__button--max";
    } else if (count === min) {
        baseClass = "counter__button--min";
    } else if (count > (max - min) * 0.8 + min) {
        baseClass = "counter__button--warning";
    }

    return baseClass;
}

export default Counter

