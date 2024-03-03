import WithTheme from "@/src/lib/WithTheme";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { ThemeMode } from "./PickCard";
import SelectTheme from "./SelectTheme";

export default function Layout({ children }: PropsWithChildren<{}>) {
    const cookieStore = cookies();
    const appearance = (cookieStore.get("theme")?.value || "auto") as ThemeMode;

    async function changeTheme(theme: ThemeMode) {
        "use server";
        theme === "auto" ? cookies().delete("theme") : cookies().set("theme", theme);
        revalidatePath("/");
    }

    return (
        <WithTheme darkTheme={appearance === "dark"}>
            <SelectTheme theme={appearance} onChange={changeTheme}>
                {children}
            </SelectTheme>
        </WithTheme>
    );
}
