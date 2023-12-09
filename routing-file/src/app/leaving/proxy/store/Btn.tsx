'use client';

import { FC } from "react";
import { useRouter } from "../../components/useRouter";

const Btn: FC = () => {
    const router = useRouter();
    return (
        <button 
            type="button"
            onClick={() => router.push('/leaving/proxy/test')}
        >
            click to reback
        </button>
    );
};

export default Btn;