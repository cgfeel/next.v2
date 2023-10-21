import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>post error layout!</div>
            {children}
        </div>
    );
}