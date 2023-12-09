'use client';

import { useRouter } from "next/navigation";
import { FC } from "react";

const Btn: FC = () => {
    const router = useRouter();
    return <button onClick={() => router.back()}>click to reback</button>
};

export default Btn;