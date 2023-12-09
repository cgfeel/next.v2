'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { FC, PropsWithChildren, createContext, useEffect, useState } from "react";

const ProxyContext = createContext<ProxyInstance>([undefined, () => {}]);

const ProxyProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [tips, setTips] = useState<string|undefined>();
    const msg = tips === undefined ? tips : (tips||'Are you sure want to leave this page?');

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const url = [pathname, searchParams].filter(i => i).join('?');
    useEffect(() => {
        setTips(undefined);
    }, [url, setTips]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (msg === undefined) return msg;
            
            event.preventDefault();
            event.returnValue = msg;
            
            return msg;
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, [msg]);

    return (
        <ProxyContext.Provider
            value={[msg, setTips]}
        >
            {children}
        </ProxyContext.Provider>
    );
};

export type ProxyInstance = [
    string|undefined, (tips?: string) => void
]

export { ProxyContext };

export default ProxyProvider;