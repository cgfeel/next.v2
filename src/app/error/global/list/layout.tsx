import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    // 测试时打开，否则不能build
    // throw new Error('global error');
    return (
        <div>
            <div>global error layout!</div>
            {children}
        </div>
    );
}