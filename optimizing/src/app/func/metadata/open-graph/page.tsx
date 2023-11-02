import { Metadata } from "next";

export const metadata: Metadata = {
    openGraph: {
        description: 'The React Framework for the Web',
        locale: 'en_US',
        siteName: 'Next.js',
        title: 'Next.js',
        type: 'website',
        url: 'https://nextjs.org',
        images: [
            {
                height: 1600,
                url: '/imgdir/vercel.png',
                width: 1600,
            },
            {
                alt: 'My custom alt',
                height: 1900,
                url: '/imgdir/mountains.jpg',
                width: 2800,
            },
        ],
    },
};

export default function Page() {
    return (
        <div>
            <div>openGraph</div>
            <ul>
                <li>
                    It may be more convenient to use the file-based Metadata API for Open Graph images. Rather than having to sync the config export with actual files, the file-based API will automatically generate the correct metadata for you.
                </li>
            </ul>
        </div>
    );
}