import { Suspense } from "react";
import OnlineTips from "./OnlinTips";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <OnlineTips />
        </Suspense>
    );
}
