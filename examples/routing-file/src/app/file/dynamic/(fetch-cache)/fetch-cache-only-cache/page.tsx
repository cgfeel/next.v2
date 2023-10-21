import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export const fetchCache = 'only-cache';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;only-cache&#039;</code>: Ensure all <code>fetch</code> requests opt into caching by changing the default to <code>cache: &#039;force-cache&#039;</code> if no option is provided and causing an error if any <code>fetch</code> requests use <code>cache: &#039;no-store&#039;</code>.
                </>,
            ]}
        />
    );
}