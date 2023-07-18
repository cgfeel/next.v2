import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    const a = {};
    a.map();
    return (
        <div>
            <div>up error layout!</div>
            {children}
        </div>
    );
}