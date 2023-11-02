import { Suspense } from "react";
import RetryBtn from "./RetryBtn";

function SearchBarFallback() {
    return <>placeholder</>
}

export default function NotFound() {
    return (
        <div>
            <h2>Not Found-app in tag post.</h2>
            <p>Could not find requested resource</p>
            <Suspense 
                fallback={<SearchBarFallback />}
            >
                <RetryBtn />
            </Suspense>
        </div>
    );
}