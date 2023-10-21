import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export const dynamic = 'force-static';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    Force static rendering and cache the data of a layout or page by forcing cookies{'()'}, headers{'()'} and useSearchParams{'()'} to return empty values.
                </>,
            ]}
        />
    );
}