import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About',
};

export default function Page() {
    return (
        <div>
            <div>Page title itself, template from layout.</div>
            <div>description from layout.</div>
        </div>
    );
}