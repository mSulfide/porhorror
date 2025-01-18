import { useState, useEffect } from 'react';

interface ITimer {
    time?: number;
}

const Timer: React.FC<ITimer> = ({ time }: ITimer) => {
    const [counter, setCounter] = useState(time || 300);
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const min = Math.floor(counter / 60);
    const sec = counter % 60;

    return (
        <div className="Timer">
            <div>{`${min}:${sec < 10 ? "0" : ""}${sec || '0'}`}</div>
        </div>
    );
}

export default Timer;