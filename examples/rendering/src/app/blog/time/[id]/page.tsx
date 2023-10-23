import { TimeType } from "../page";

export async function generateStaticParams() {
    return [{ id: '1' }];
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const data = await fetch('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    if (!data.ok) {
        return (
            <div>fetch time error</div>
        );
    }

    const now = await data.json() as TimeType;
    return (
        <div>time now-{id}: {now.datetime}</div>
    );
}