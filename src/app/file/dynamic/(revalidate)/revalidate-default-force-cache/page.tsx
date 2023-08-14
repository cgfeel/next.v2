import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'force-cache',
    });
    return (
        <List
            data={data}
            items={[
                <>
                    The default heuristic to cache any <code>fetch</code> requests that set their <code>cache</code> option to <code>&#039;force-cache&#039;</code> or are discovered before a dynamic function is used.
                </>,
            ]}
        />
    );
}