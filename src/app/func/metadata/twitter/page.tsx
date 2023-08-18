import { Metadata } from "next";

export const metadata: Metadata = {
    twitter: {
        card: 'summary_large_image',
        creator: '@nextjs',
        creatorId: '1467726470533754880',
        description: 'The React Framework for the Web',
        images: ['/imgdir/vercel.png'],
        siteId: '1467726470533754880',
        title: 'Next.js',
    },
};

export default function Page() {
    return (
        <div>twitter</div>
    );
}