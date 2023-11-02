'use client';

import { FC, useState } from "react";
import Echart from "../../component/Echart";

const Chart: FC<{ nonce: string }> = ({ nonce }) => {
    const [chart, setChart] = useState(-1);
    return (
        <>
            <div>
                <button
                    onClick={() => setChart(val => val ? 0 : 1)}
                    disabled={chart < 0}
                >
                    {chart ? 'hidden' : 'show'}
                </button>
            </div>
            {chart !== 0 ? (
                <Echart 
                    nonce={nonce}
                    onRead={() => setChart(1)} 
                />
            ) : (
                <div>chart is hidden.</div>
            )}
        </>
    );
};

export default Chart;