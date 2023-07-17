import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    throw new Error('global error');
    return (
        <div>
            <div>global error layout!</div>
            {children}
        </div>
    );
}