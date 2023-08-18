import { Metadata } from "next";

export const metadata: Metadata = {
    applicationName: 'Next.js',
    authors: [{ name: 'levi', url: 'https://github.com/cgfeel' }, { name: 'Seb' }],
    colorScheme: 'dark',
    creator: 'levi',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    generator: 'Next.js',
    keywords: ['Next.js', 'React', 'JavaScript'],
    publisher: 'levi',
    referrer: 'origin-when-cross-origin',
};

export default function Page() {
    return (
        <div>Basic Fields</div>
    );
}