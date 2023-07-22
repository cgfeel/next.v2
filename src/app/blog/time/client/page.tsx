'use client'

import { useEffect, useState } from "react";

type DateType = {
    time: number
};

export default function Page() {
    const [now, setData] = useState<DateType|undefined>();

    useEffect(() => {
        fetch(`/api/time`).then(data => data.json()).then(data => {
            setData(data);
        });
    }, [setData]);

    return (
        <div>time now: {now ? new Date(now.time).toLocaleTimeString() : '--'}</div>
    );
}