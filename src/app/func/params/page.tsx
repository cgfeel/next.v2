'use client'

import { useParams, usePathname } from "next/navigation";

export default function Page() {
    const params = useParams();
    const pathname = usePathname();

    return (
        <ul>
            <li>params: <code>{JSON.stringify(params)}</code></li>
            <li>pathname: <code>{pathname}</code></li>
        </ul>
    );
}