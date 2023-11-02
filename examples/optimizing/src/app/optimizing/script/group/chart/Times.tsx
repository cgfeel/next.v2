'use client';

import { FC, useEffect, useState } from "react";

const Times: FC = () => {
    const [time, setTime] = useState(0);
    useEffect(() => {
        setTime(Date.now());
    }, [setTime]);

    return (
        <div>
            {time === 0 ? '--' : new Date(time).toLocaleString()}
            <button
                onClick={() => setTime(Date.now())}
                style={{
                    marginLeft: 20
                }}
            >
                uptime
            </button>
        </div>
    );
};

export default Times;