import Api from "@/src/utils/api";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren<{}>) {
    // const data = await Api.get<{time: number}>(`${process.env.HOME_URL}/api/time`);
    return (
        <div>
            <div>layout time</div>
            <hr />
            <div>{children}</div>
        </div>
    );
}