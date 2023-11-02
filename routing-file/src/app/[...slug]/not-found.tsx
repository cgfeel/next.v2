import Api from "@/src/utils/api";
import { headers } from "next/headers";
import Link from "next/link";

type TimeType = {
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

export default async function NotFound() {
    const headerList = headers();
    const domain = headerList.get('host');
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');

    console.log('[slug]-root-not: ', new Date().toLocaleString());
    return (
        <div>
            <p>
                我存在的意义就是为了终结<code>app</code>目录下<code>not-found</code>无限循环的。
            </p>
            <hr />
            <p>domian: {domain}</p>
            <p>current: {data.datetime}</p>
            <hr />
            <p>
                <Link href="/">Home Page</Link>
            </p>
        </div>
    );
}