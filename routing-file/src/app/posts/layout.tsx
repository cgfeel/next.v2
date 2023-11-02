import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { NavigationEvent } from "./components/NavigationEvent";

export const metadata: Metadata = {
    title: '列表页',
    description: '展示数据加载',
}

export default function PostsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <Suspense fallback={null}>
                <NavigationEvent />
            </Suspense>
        </>
    );
}