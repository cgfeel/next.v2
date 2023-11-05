import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: '服务端数据加载',
    description: '服务端组件获取列表数据，包含组件loading',
}

export default function PostListLayout({ children }: { children: ReactNode }) {
    return children;
}