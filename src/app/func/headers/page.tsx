import Api from "@/src/utils/api";
import { headers } from "next/headers";
import { TimeType } from "../../blog/time/page";

async function getTime() {
    const headersInstance = headers();
    const ua = headersInstance.get('User-Agent')||'chrome';

    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        headers: {
            'User-Agent': ua,
        }
    });

    return { ua, data };
}

export default async function Page() {
    const { ua, data } = await getTime();
    return (
        <div>
            <div>ua: {ua === 'chrome' ? '--' : ua}</div>
            <div>time:</div>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
}