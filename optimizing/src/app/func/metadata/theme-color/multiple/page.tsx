import { Metadata } from "next";

// @deprecated nextjs14
/*export const metadata: Metadata = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'cyan' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};*/

export default function Page() {
    return (
        <div>multiple theme-color</div>
    );
}