'use client'

import { useParams, usePathname } from "next/navigation";
import ActiveSegment from "../../../components/ActiveSegment";

export default function Page() {
    const params = useParams();
    const pathname = usePathname();

    return (
        <div
            style={{
                height: 1200
            }}
        >
            <ul>
                <li>params: <code>{JSON.stringify(params)}</code></li>
                <li>pathname: <code>{pathname}</code></li>
                <li>
                    <ActiveSegment />
                </li>
            </ul>
        </div>
    );
}