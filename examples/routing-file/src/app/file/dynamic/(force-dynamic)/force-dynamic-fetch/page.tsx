import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'no-store',
    });
    return (
        <List
            data={data}
            items={[
                <>
                    Setting the option of every <code>fetch{'()'}</code> request in a layout or page to <code>{'{ '}cache: &#039;no-store&#039;{' }'}</code>.
                </>,
            ]}
        />
    );
}