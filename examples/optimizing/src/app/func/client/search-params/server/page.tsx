export default function Page({ searchParams }: { searchParams: { [key: string]: string|string[] } }) {
    return (
        <>
            <h1>Server Components: {JSON.stringify(searchParams)}</h1>
        </>
    );
}