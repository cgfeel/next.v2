import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const revalidate = false;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    <code>false</code>: {'(default)'} This option does not override the <code>revalidate</code> value set by individual <code>fetch</code> requests.
                </>,
            ]}
        />
    );
}