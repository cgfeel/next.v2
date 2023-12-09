import { PropsWithChildren } from "react";
import ProxyProvider from "../components/ProxyProvider";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return <ProxyProvider>{children}</ProxyProvider>
}