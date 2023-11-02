import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export const fetchCache = 'force-no-store';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    Setting the segment config to <code>export const fetchCache = &#039;force-no-store&#039;</code>
                </>,
            ]}
        />
    );
}