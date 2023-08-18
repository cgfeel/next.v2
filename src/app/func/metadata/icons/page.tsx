import { Metadata } from "next";

export const metadata: Metadata = {
    icons: {
        apple: '/icons/apple-icon.png',
        icon: '/icons/icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/photo/609d6bc5cc55be62018df74561414d4cb077f3a9a05d4-EUDMv6.jpeg',
        },
        shortcut: '/icons/shortcut-icon.png',
    },
};

export default function Page() {
    return (
        <div>
            <div>icons</div>
            <div>The msapplication-* meta tags are no longer supported in Chromium builds of Microsoft Edge, and thus no longer needed.</div>
        </div>
    );
}