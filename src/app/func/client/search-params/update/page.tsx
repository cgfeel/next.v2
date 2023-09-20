import { Suspense } from "react";
import RouterCom from "./RouterCom";

// This component passed as fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.
function SearchBarFallback() {
    return <>placeholder</>
}

export default function Page() {
    return (
        <div>
            <Suspense
                fallback={<SearchBarFallback />}
            >
                <RouterCom />
            </Suspense>
        </div>
    );
}