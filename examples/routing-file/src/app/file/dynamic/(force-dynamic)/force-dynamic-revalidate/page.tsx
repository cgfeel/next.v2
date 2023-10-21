import Api from "@/src/utils/api";
import List from "../../../components/List";
import { TimeType } from "../../layout";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        next: { revalidate: 0 },
    });
    return (
        <List
            data={data}
            items={[
                <>
                    Setting the option of every <code>fetch{'()'}</code> request in a layout or page to <code>{'{ '}next:{' { '}revalidate: 0{' } }'}</code>.
                </>,
            ]}
        />
    );
}