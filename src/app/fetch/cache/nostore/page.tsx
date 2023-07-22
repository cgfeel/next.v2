import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'no-store',
    });
    return (
        <div>page time: {data.datetime}</div>
    );
}