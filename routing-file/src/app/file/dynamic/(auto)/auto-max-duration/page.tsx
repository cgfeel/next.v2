import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export const maxDuration = 5;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    Based on your deployment platform, you may be able to use a higher default execution time for your function. This setting allows you to opt into a higher execution time within your plans limit.
                </>,
            ]}
        />
    );
}