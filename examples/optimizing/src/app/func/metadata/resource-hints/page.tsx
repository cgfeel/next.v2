'use client'

import ReactDOM from "react-dom";
import styles from "../../styles.module.css";

export default function Page() {
    ReactDOM.preload('/font/cooperhewitt-bold-webfont.woff2', { as: 'font' });
    return (
        <div
            className={styles.list}
        >
            <div>Resource hints</div>
            <ul>
                <li>
                    These methods are currently only supported in Client Components, which are still Server Side Rendered on initial page load.
                </li>
                <li>
                    Next.js in-built features such as <code>next{'/'}font</code>, <code>next{'/'}image</code> and <code>next/script</code> automatically handle relevant resource hints.
                </li>
                <li>
                    React 18.3 does not yet include type definitions for <code>ReactDOM.preload</code>, <code>ReactDOM.preconnect</code>, and <code>ReactDOM.preconnectDNS</code>. You can use <code>{'//'} @ts-ignore</code> as a temporary solution to avoid type errors.
                </li>
            </ul>
        </div>
    );
}