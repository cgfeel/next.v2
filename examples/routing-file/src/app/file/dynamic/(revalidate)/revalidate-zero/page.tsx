import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export const revalidate = 0;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>0</code>: Ensure a layout or page is always dynamically rendered even if no dynamic functions or uncached data fetches are discovered.
                </>,
            ]}
        />
    );
}