import { Metadata } from "next";

export const metadata: Metadata = {
    manifest: '/api/manifest',
};

export default function Page() {
    return (
        <div>manifest</div>
    );
}