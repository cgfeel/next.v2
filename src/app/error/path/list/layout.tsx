import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>post-list error layout!</div>
            {children}
        </div>
    );
}