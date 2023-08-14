import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'no-store',
    });
    return (
        <List
            data={data}
            items={[
                <>
                    This option changes the default of <code>fetch</code> requests that do not set a <code>cache</code> option to <code>&#039;no-store&#039;</code>.
                </>,
            ]}
        />
    );
}