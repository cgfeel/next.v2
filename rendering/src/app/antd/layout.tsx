import WithTheme from "@/src/lib/WithTheme";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { ThemeMode } from "./PickCard";
import SelectTheme from "./SelectTheme";

export default function Layout({ children }: PropsWithChildren<{}>) {
    const cookieStore = cookies();
    const appearance = cookieStore.get("theme")?.value || "light";
    const appearanceSystem = cookieStore.get("systemTheme")?.value || "light";

    async function changeTheme(theme: ThemeMode) {
        "use server";
        cookies().set("theme", theme);
    }

    async function systemTheme(theme: Exclude<ThemeMode, "auto">) {
        "use server";
        cookies().set("systemTheme", theme);
    }

    return (
        <WithTheme
            darkTheme={appearance === "dark" ? true : appearance === "light" ? false : appearanceSystem === "dark"}>
            <SelectTheme system={appearanceSystem} theme={appearance} changeSystem={systemTheme} onChange={changeTheme}>
                {children}
            </SelectTheme>
        </WithTheme>
    );
}
