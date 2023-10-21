import { Suspense } from "react";
import Stream from "../../components/Stream";

export default function PostUserPage({ params }: { params: { uid: string[] } }) {
    const {uid} = params;
    return (
        <div>
            <div>user - slugs：{uid.join('|')}</div>
            <Suspense fallback={(
                <div>loading streaming...</div>
            )}>
                <Stream />
            </Suspense>
        </div>
    );
}