import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>global error layout!</div>
            {children}
        </div>
    );
}