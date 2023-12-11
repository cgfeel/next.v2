'use client';

import { useRouter } from "next/navigation";
import { FC } from "react";

const Btn: FC = () => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.back()}>click to reback</button>
            <hr />
            <button onClick={() => router.push('/leaving/proxy/store')}>click link store</button>
        </div>
    )
};

export default Btn;