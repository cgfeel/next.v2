import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const revalidate = false;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'no-store',
    });
    return (
        <List
            data={data}
            items={[
                <>
                    It is still possible for individual <code>fetch</code> requests to use <code>cache: &#039;no-store&#039;</code> to avoid being cached and make the route dynamically rendered.
                </>,
            ]}
        />
    );
}