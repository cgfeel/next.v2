import { Metadata } from "next";
import { Suspense } from "react";
import { NavigationEvent } from "./components/NavigationEvent";

export const metadata: Metadata = {
    title: '列表页',
    description: '展示数据加载',
}

export default function PostsLayout({ children }) {
    return (
        <>
            {children}
            <Suspense fallback={null}>
                <NavigationEvent />
            </Suspense>
        </>
    );
}