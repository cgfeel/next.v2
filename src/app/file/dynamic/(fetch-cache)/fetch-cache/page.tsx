import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const fetchCache = 'auto';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;auto&#039;</code> {'(default)'}- The default option to cache <code>fetch</code> requests before dynamic functions with the <code>cache</code> option they provide and not cache <code>fetch</code> requests after dynamic functions.
                </>,
            ]}
        />
    );
}