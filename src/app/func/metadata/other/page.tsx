import { Metadata } from "next";
import styles from "../../styles.module.css";

export const metadata: Metadata = {
    alternates: {
        canonical: 'https://nextjs.org',
        languages: {
            'de-DE': 'https://nextjs.org/de-DE',
            'en-US': 'https://nextjs.org/en-US',
        },
        media: {
            'only screen and (max-width: 600px)': 'https://nextjs.org/mobile',
        },
        types: {
            'application/rss+xml': 'https://nextjs.org/rss',
        },
    },
    appleWebApp: {
        title: 'Apple Web App',
        statusBarStyle: 'black-translucent',
        startupImage: [
            '/imgdir/vercel.png',
            {
                media: '(device-width: 768px) and (device-height: 1024px)',
                url: '/imgdir/mountains.png',
            },
        ],
    },
    appLinks: {
        android: {
            app_name: 'app_name_android',
            package: 'com.example.android/package',
        },
        ios: {
            app_store_id: 'app_store_id',
            url: 'https://nextjs.org/ios',
        },
        web: {
            should_fallback: true,
            url: 'https://nextjs.org/web',
        },
    },
    archives: ['https://nextjs.org/13'],
    assets: ['https://nextjs.org/assets'],
    bookmarks: ['https://nextjs.org/13'],
    category: 'technology',
    itunes: {
        appArgument: 'myAppArgument',
        appId: 'myAppStoreID',
    },
    other: {
        custom: 'meta',
    },
    verification: {
        google: 'google',
        yahoo: 'yahoo',
        yandex: 'yandex',
        other: {
            me: ['my-email', 'my-link'],
        },
    },
    viewport: {
        initialScale: 1,
        maximumScale: 1,
        width: 'device-width',
    },
};

export default function Page() {
    return (
        <div
            className={styles.list}
        >
            <div>viewport</div>
            <div>
                The <code>viewport</code> meta tag is automatically set with the following default values. Usually, manual configuration is unnecessary as the default is sufficient. However, the information is provided for completeness.
            </div>
            <hr />
            <div>verification</div>
            <hr />
            <div>appleWebApp</div>
            <hr />
            <div>alternates</div>
            <hr />
            <div>appLinks</div>
            <hr />
            <div>archives</div>
            <hr />
            <div>assets</div>
            <hr />
            <div>bookmarks</div>
            <hr />
            <div>category</div>
            <hr />
            <div>other</div>
            <div>
                You can use the <code>other</code> option to render any custom metadata tag.
            </div>
            <hr />
        </div>
    );
}