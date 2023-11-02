import Api from "@/src/utils/api";
import List from "../../../../components/List";
import { TimeType } from "../../../layout";

export const dynamicParams = false;

export async function generateStaticParams() {
    return [{ slug: '1' }, { slug: '2' }, { slug: '3' }];
}

export default async function Page({ params }: { params: { slug: string; } }) {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    const { slug } = params;
    return (
        <List
            data={data}
            items={[
                <>
                    Dynamic segments not included in <code>generateStaticParams</code> will return a 404.
                </>,
                <>
                    dynamic page is {slug}
                </>,
            ]}
        />
    );
}