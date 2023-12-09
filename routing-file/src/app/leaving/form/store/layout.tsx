import { PropsWithChildren } from "react";
import Form from "./Form";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return <Form>{children}</Form>;
}