import { Metadata } from "next";

export const metadata: Metadata = {
    icons: {
        apple: [
            { url: '/icons/icon-small.png' },
            { url: '/icons/shortcut-icon.png', sizes: '72x72', type: 'image/png' },
        ],
        icon: [{ url: '/icons/icon.png' }, new URL('/icons/icon.png', 'https://github.com/cgfeel/next.v2')],
        other: [
            {
                rel: 'apple-touch-icon-precomposed',
                url: '/photo/609d6bc5cc55be62018df74561414d4cb077f3a9a05d4-EUDMv6.jpeg',
            },
        ],
        shortcut: ['/icons/shortcut-icon.png'],
    },
};

export default function Page() {
    return (
        <div>
            multiple icons
        </div>
    );
}