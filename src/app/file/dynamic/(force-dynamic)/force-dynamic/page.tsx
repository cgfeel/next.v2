import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;force-dynamic&#039;</code>: Force dynamic rendering and uncached data fetching of a layout or page by disabling all caching of fetch requests and always revalidating.
                </>,
                <>
                    <code>getServerSideProps{'()'}</code> in the pages directory.
                </>,
            ]}
        />
    );
}