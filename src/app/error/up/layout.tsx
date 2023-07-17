import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    throw new Error('up error');
    return (
        <div>
            <div>up error layout!</div>
            {children}
        </div>
    );
}