import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const fetchCache = 'default-no-store';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;default-no-store&#039;</code>: Allow any <code>cache</code> option to be passed to <code>fetch</code> but if no option is provided then set the <code>cache</code> option to <code>&#039;no-store&#039;</code>. This means that even <code>fetch</code> requests before dynamic functions are considered dynamic.
                </>,
            ]}
        />
    );
}