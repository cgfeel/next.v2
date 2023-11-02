import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

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