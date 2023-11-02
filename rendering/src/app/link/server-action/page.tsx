import Api from "@/src/utils/api";
import { TimeType } from "../../blog/time/page";
import { action } from "./action";
import Client from "./Client";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'no-cache',
        next: {
            tags: ['link-server-action'],
        },
    });

    return (
        <div>
            <div>通过server action + cache status实现无感刷新</div>
            <Client loaded={action} />
            <hr />
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
}