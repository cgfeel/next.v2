'use client';

import { useRouter } from "@/src/components/proxyProvider/useRouter";
import { FC, PropsWithChildren } from "react";

const Btn: FC<PropsWithChildren<BtnProps>> = ({ children, href }) => {
    const router = useRouter();
    return (
        <button 
            type="button"
            onClick={() => href ? router.push(href) : router.back()}
        >
            {children}
        </button>
    );
};

export interface BtnProps {
    href?: string;
}

export default Btn;