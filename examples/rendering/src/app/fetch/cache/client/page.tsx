import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import Time from "./Time";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <div>
            <div>service page time : {data.datetime}</div>
            <hr />
            <Time />
        </div>
    );
}