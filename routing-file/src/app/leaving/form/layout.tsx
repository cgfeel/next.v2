import { PropsWithChildren } from "react";
import NavigationProvider from "../components/NavigationProvider";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return <NavigationProvider>{children}</NavigationProvider>;
}