import Nav from "@/src/components/nav";
import { PropsWithChildren } from "react";
import NavLinks from "../components/NavLinks";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <>
            <NavLinks />
            <hr />
            {children}
        </>
    );
}