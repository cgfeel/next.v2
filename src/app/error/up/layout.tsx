import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    // 测试时打开，否则build不通过
    // throw new Error('up layout');
    return (
        <div>
            <div>up error layout!</div>
            {children}
        </div>
    );
}