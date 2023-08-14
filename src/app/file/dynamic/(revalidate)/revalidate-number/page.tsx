import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const revalidate = 10;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>number</code>: {'(in seconds)'} Set the default revalidation frequency of a layout or page to <code>n</code> seconds.
                </>,
            ]}
        />
    );
}