import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const dynamic = 'auto';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;auto&#039;</code> {'('}default{')'}: The default option to cache as much as possible without preventing any components from opting into dynamic behavior.
                </>,
            ]}
        />
    );
}