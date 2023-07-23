import Api from "@/src/utils/api";
import { TimeType } from "../../blog/time/page";
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