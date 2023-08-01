'use client'

import { useEffect, useState } from "react";
import Echart from "../../component/Echart";

export default function Page() {
    const [time, setTime] = useState(0);
    const [chart, setChart] = useState(-1);

    useEffect(() => {
        setTime(Date.now());
    }, [setTime]);

    return (
        <>
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
            <div>
                <button
                    onClick={() => setChart(val => val ? 0 : 1)}
                    disabled={chart < 0}
                >
                    {chart ? 'hidden' : 'show'}
                </button>
            </div>
            {chart !== 0 ? <Echart onRead={() => setChart(1)} /> : (
                <div>chart is hidden.</div>
            )}
        </>
    );
}