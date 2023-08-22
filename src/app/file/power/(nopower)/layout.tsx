import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { hasPower } from "../lib";

export default function Layout({ children }: PropsWithChildren<{}>) {
    if (hasPower()) {
        redirect('/file/power/1');
    }
    return (
        <div>
            {children}
        </div>
    );
}