import { Metadata } from "next";

export const metadata: Metadata = {
    twitter: {
        app: {
            id: {
                googleplay: 'twitter_app://googleplay',
                ipad: 'twitter_app://ipad',
                iphone: 'twitter_app://iphone',
            },
            name: 'twitter_app',
            url: {
                ipad: 'https://ipad_url',
                iphone: 'https://iphone_url',
            },
        },
        card: 'app',
        creator: '@nextjs',
        creatorId: '1467726470533754880',
        description: 'The React Framework for the Web',
        images: {
            alt: 'Next.js Logo',
            url: '/imgdir/vercel.png',
        },
        siteId: '1467726470533754880',
        title: 'Next.js',
    },
};

export default function Page() {
    return (
        <div>twitter app</div>
    );
}