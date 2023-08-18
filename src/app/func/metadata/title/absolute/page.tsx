import { Metadata } from "next";

export const metadata: Metadata = {
    description: 'page description',
    title: {
        absolute: 'Absolute',
    },
};

export default function Page() {
    return (
        <div>
            <div>Page title is absolute, whitout layout.</div>
            <div>description itself.</div>
        </div>
    );
}