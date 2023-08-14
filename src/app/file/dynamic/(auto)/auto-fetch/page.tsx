import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../components/List";

export const revalidate = 0;

export default async function Page() {
    const data = await Api.get<TimeType>('/api/time/redirect', {
        cache: 'no-store',
        next: {
            tags: ['dynamic-auto-fetch']
        },
    });

    return (
        <List
            data={data}
            items={[
                <>
                    <code>&#039;auto&#039;</code> {'('}default{')'}: The default option to cache as much as possible without preventing any components from opting into dynamic behavior.
                </>,
            ]}
        />
    );
}