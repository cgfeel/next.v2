'use client'

import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const params = useParams();
    const pathname = usePathname();

    return (
        <div>
            <ul>
                <li>params: <code>{JSON.stringify(params)}</code></li>
                <li>pathname: <code>{pathname}</code></li>
            </ul>
        </div>
    );
}