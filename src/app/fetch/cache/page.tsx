import Api from "@/src/utils/api";
import { TimeType } from "../../blog/time/page";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <div>page time : {data.datetime}</div>
    );
}