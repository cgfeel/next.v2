'use client'

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const link = '/fetch/server-action/post/6';

const ClientLink: FC = () => {
    const pathname = usePathname();
    const { slug } = useParams<{ slug: string }>();
    const currently = pathname === link;

    const router = useRouter();
    useEffect(() => {
        if (['0', '6', 'navigation'].indexOf(slug) < 0) {
            router.prefetch('/fetch/server-action/post/navigation');
        }
    }, [router, slug]);

    return (
        <Link href={'/fetch/server-action/post/navigation#name=python'}>python{currently ? ' (current)' : ''}</Link>
    );
};

export default ClientLink;