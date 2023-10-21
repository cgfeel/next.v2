import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export const fetchCache = 'force-cache';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;force-cache&#039;</code>: Ensure all <code>fetch</code> requests opt into caching by setting the <code>cache</code> option of all <code>fetch</code> requests to <code>&#039;force-cache&#039;</code>.
                </>,
            ]}
        />
    );
}