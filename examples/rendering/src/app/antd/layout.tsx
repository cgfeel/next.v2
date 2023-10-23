import WithTheme from "@/src/lib/WithTheme";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <WithTheme>{children}</WithTheme>
    );
}