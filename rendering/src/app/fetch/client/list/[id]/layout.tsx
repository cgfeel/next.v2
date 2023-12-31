import { Metadata } from "next";
import { PropsWithChildren } from "react";
import List from "./List";

export const metadata: Metadata = {
    title: '客户端端数据加载',
    description: '客户端组件获取列表数据，包含swr',
}

export default function PostListLayout({ children }: PropsWithChildren<{}>) {
    return (
        <List>
            {children}
        </List>
    );
}