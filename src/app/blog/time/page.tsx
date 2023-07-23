export type TimeType = {
    abbreviation: string;
    client_ip: string;
    datetime: string;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from: null;
    dst_offset: number;
    dst_until: null;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
    week_number: number;
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