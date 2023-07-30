import { PropsWithChildren } from "react";
import Nav from "../components/Nav";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <>
            <Nav />
            <hr />
            {children}
        </>
    );
}