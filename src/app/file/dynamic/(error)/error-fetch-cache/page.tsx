import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const fetchCache = 'only-cache';
export const dynamicParams = false;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    Setting the segment config to <code>fetchCache = &#039;only-cache&#039;, dynamicParams = false</code>.
                </>,
            ]}
        />
    );
}