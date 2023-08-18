import { Metadata } from "next";

export const metadata: Metadata = {
    openGraph: {
        title: 'Next.js',
        description: 'The React Framework for the Web',
        type: 'article',
        publishedTime: '2023-01-01T00:00:00.000Z',
        authors: ['Levi', 'Seb'],
    },
};

export default function Page() {
    return (
        <div>article openGraph</div>
    );
}