'use client'

import { useParams } from "next/navigation";
import styles from "../../../../styles.module.css";

export default function Page() {
    const params = useParams();
    return (
        <div
            className={styles.list}
        >
            params: <code>{JSON.stringify(params)}</code>
        </div>
    );
}