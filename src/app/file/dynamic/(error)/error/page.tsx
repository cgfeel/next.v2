import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const dynamic = 'error';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;error&#039;</code>: Force static rendering and cache the data of a layout or page by causing an error if any components use dynamic functions or uncached data.
                </>,
                <>
                    <code>getStaticProps{'()'}</code> in the pages directory.
                </>,
            ]}
        />
    );
}