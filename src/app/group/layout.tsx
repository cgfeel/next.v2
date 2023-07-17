import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>group layout of root level</div>
            {children}
        </div>
    );
}