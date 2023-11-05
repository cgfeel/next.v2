import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: '二级路由',
    description: '展示子级路由页面',
}

export default function MetaLayout({ children }: { children: ReactNode }) {
    return children;
}