import Api from "@/src/utils/api";
import { PropsWithChildren } from "react";
import { TimeType } from "../../blog/time/page";

export default async function Layout({ children }: PropsWithChildren<{}>) {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <div>
            <div>layout time: {data.datetime}</div>
            <hr />
            <div>{children}</div>
        </div>
    );
}