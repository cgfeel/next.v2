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
                    <code>&#039;force-no-store&#039;</code>: Ensure all <code>fetch</code> requests opt out of caching by setting the <code>cache</code> option of all <code>fetch</code> requests to <code>&#039;no-store&#039;</code>. This forces all <code>fetch</code> requests to be re-fetched every request even if they provide a <code>&#039;force-cache&#039;</code> option.
                </>,
            ]}
        />
    );
}