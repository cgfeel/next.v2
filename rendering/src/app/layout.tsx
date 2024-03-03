import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

// import StyledComponentsRegistry from "@/src/lib/AntdRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const appearance = cookieStore.get("theme")?.value || "auto";
    return (
        <html lang="en" data-theme={appearance}>
            <body className={inter.className}>
                {/* <StyledComponentsRegistry>{children}</StyledComponentsRegistry> */}
                <AntdRegistry>{children}</AntdRegistry>
            </body>
        </html>
    );
}
