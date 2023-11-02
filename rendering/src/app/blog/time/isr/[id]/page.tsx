import { TimeType } from "../../page";

export async function generateStaticParams() {
    return [{ id: '1' }];
}

export default async function Page() {
    const data = await fetch('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        next: { revalidate: 10 }
    });
    if (!data.ok) {
        return (
            <div>fetch time error</div>
        );
    }

    const now = await data.json() as TimeType;
    return (
        <div>time now: {now.datetime}</div>
    );
}