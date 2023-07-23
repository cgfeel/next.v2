import { PropsWithChildren } from "react";
import { getTime } from "./service";

export default async function Layout({ children }: PropsWithChildren<{}>) {
    const data = await getTime(1);
    return (
        <div>
            <div>react cache layout time: {data.fromDateTime}</div>
            <hr />
            {children}
        </div>
    );
}