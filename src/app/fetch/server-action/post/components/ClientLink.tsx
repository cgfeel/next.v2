'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const link = '/fetch/server-action/post/6';

const ClientLink: FC = () => {
    const pathname = usePathname();
    const currently = pathname === link;

    const router = useRouter();
    useEffect(() => {
        router.prefetch('/fetch/server-action/post/navigation');
    }, [router]);

    return (
        <Link href={'/fetch/server-action/post/navigation#name=python'}>python{currently ? ' (current)' : ''}</Link>
    );
};

export default ClientLink;