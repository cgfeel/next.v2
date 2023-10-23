'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [time, setTime] = useState(0);
    
    useEffect(() => {
        setTime(Date.now());
    }, [setTime]);

    return (
        <div>
            <div>本地组件不需要服务端缓存设置，也会拿到最新的数据，通过随机值指向的URL将会刷新视图</div>
            <hr />
            <div>time: {time}</div>
            <Link href={`/link/fetch?${time}`}>auto link client</Link>
        </div>
    );
}