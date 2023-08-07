import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div
            style={{
                border: '1px solid #fff',
                margin: 20,
                padding: 20,
            }}
        >
            {children}
        </div>
    );
}