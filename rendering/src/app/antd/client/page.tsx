import { Suspense } from "react";
import SearchParams from "./SearchParams";

const SearchBarFallback: FC = () => {
    return <>placeholder</>
}

export default function Page({ searchParams }: { searchParams: { [key: string]: string|string[] } }) {
    return (
        <div>
            <h1>Server Components: {JSON.stringify(searchParams)}</h1>
            <Suspense 
                fallback={<SearchBarFallback />}
            >
                <SearchParams />
            </Suspense>
        </div>
    );
}