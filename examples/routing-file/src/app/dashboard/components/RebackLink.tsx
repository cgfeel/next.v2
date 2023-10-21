'use client';

import { useRouter } from "next/navigation";
import { FC } from "react";

const RebackLink: FC = () => {
    const router = useRouter();
    return (
        <button 
            onClick={() => router.back()}
        >
            reback route page
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
            </span>
        </button>
    );
};

export default RebackLink;