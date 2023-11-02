import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export const revalidate = 0;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'force-cache',
    });
    return (
        <List
            data={data}
            items={[
                <>
                    but leaves <code>fetch</code> requests that opt into <code>&#039;force-cache&#039;</code> or use a positive <code>revalidate</code> as is.
                </>,
            ]}
        />
    );
}