import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { hasPower } from "../lib";

export default function Layout({ children }: PropsWithChildren<{}>) {
    if (!hasPower()) {
        notFound();
    }
    
    return (
        <div>
            {children}
        </div>
    );
}