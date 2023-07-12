import { Metadata } from "next";
import { Suspense } from "react";
import { NavigationEvent } from "./components/NavigationEvent";

export const metadata: Metadata = {
    title: '二级路由',
    description: '展示子级路由页面',
}

export default function MetaLayout({ children }) {
    return children;
}