import { Metadata } from "next";
import styles from "../../styles.module.css";

// inherit the above metadataBase
export const metadata: Metadata = {
    alternates: {
        canonical: '/func/metadata/metadata-base',
        languages: {
            'en-US': '/en-US',
            'de-DE': '/de-DE',
        },
    },
    openGraph: {
        images: '/imgdir/mountains.jpg',
    },
};

export default function Page() {
    return (
        <div
            className={styles.list}
        >
            <ul>
                <li>
                    <code>metadataBase</code> is typically set in root <code>app/layout.js</code> to apply to URL-based <code>metadata</code> fields across all routes.
                </li>
                <li>
                    All URL-based <code>metadata</code> fields that require absolute URLs can be configured with a <code>metadataBase</code> option.
                </li>
                <li>
                    <code>metadataBase</code> can contain a subdomain e.g. <code>https://app.acme.com</code> or base path e.g. <code>https://acme.com/start/from/here</code>
                </li>
                <li>
                    If a <code>metadata</code> field provides an absolute URL, <code>metadataBase</code> will be ignored.
                </li>
                <li>
                    Using a relative path in a URL-based <code>metadata</code> field without configuring a <code>metadataBase</code> will cause a build error.
                </li>
                <li>
                    Next.js will normalize duplicate slashes between <code>metadataBase</code> {'('}e.g. <code>https://acme.com/</code>{')'} and a relative field {'('}e.g. <code>/path</code>to a single slash {'('}e.g. <code>https://acme.com/path</code>{')'}
                </li>
            </ul>
        </div>
    );
}