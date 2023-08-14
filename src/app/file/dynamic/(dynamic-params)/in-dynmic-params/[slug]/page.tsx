import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import List from "../../../../components/List";

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
                    <code>true</code>{' (default)'}: Dynamic segments not included in <code>generateStaticParams</code> are generated on demand.
                </>,
                <>
                    This option replaces the <code>fallback: true | false | blocking</code> option of <code>getStaticPaths</code> in the <code>pages</code> directory.
                </>,
                <>
                    When <code>dynamicParams = true</code>, the segment uses Streaming Server Rendering.
                </>,
                <>
                    If the <code>dynamic = &#039;error&#039;</code> and <code>dynamic = &#039;force-static&#039;</code> are used, it&#039;ll change the default of <code>dynamicParams</code> to <code>false</code>.
                </>,
                <>
                    dynamic page is {slug}
                </>,
            ]}
        />
    );
}