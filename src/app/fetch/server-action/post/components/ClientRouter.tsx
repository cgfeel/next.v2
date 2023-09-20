'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect } from "react";

const link = '/fetch/server-action/post/5';

const ClientRouter: FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const name = searchParams.get('name');
    const router = useRouter();

    const currently = name === 'php' || pathname === link;

    const navigat = useCallback(() => {
        router.push(navigator.onLine ? '/fetch/server-action/post/5': '/fetch/server-action/post/0?name=php');
    }, [router]);

    useEffect(() => {
        router.prefetch('/fetch/server-action/post/0?name=php');
    }, [router]);

    return (
        <button onClick={() => navigat()}>php{currently ? ' (current)' : ''}</button>
    );
};

export default ClientRouter;