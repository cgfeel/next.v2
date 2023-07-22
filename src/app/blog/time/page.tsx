export type TimeType = {
    datetime: string;
    unixtime: number;
}

export default async function Page() {
    const data = await fetch('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'no-store'
    });
    if (!data.ok) {
        return (
            <div>fetch time error</div>
        );
    }

    const now = await data.json() as TimeType;
    return (
        <div>time now: {now.datetime}</div>
    );
}