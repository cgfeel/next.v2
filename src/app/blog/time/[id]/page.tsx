export async function generateStaticParams() {
    return [{ id: '1' }];
}

export default async function Page() {
    const data = await fetch('http://localhost:3000/api/time');
    if (!data.ok) {
        return (
            <div>fetch time error</div>
        );
    }

    const now = await data.json() as { time: number };
    return (
        <div>time now: {new Date(now.time).toLocaleTimeString()}</div>
    );
}