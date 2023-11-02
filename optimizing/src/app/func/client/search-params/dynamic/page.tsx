import SearchBar from "../SearchBar";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <>
            <h1>Dynamic Rendering</h1>
            <nav>
                <SearchBar />
            </nav>
        </>
    );
}