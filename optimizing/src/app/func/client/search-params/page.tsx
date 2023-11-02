import { FC, Suspense } from "react";
import SearchBar from "./SearchBar";

const SearchBarFallback: FC = () => {
    return <>placeholder</>
}

export default function Page() {
    return (
        <>
            <h1>Static Rendering</h1>
            <Suspense fallback={<SearchBarFallback />}>
                <SearchBar />
            </Suspense>
        </>
    );
}