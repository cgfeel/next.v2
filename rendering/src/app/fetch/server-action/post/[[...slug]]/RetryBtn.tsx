'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

const RetryBtn: FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const name = searchParams.get('name');
    return (
        <button 
            onClick={() => navigator.onLine && router.replace(`/fetch/server-action/post/${name === 'php' ? '5' : '2'}`)}
        >
            Try again
        </button>
    );
};

export default RetryBtn;