import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { openGraphImage } from "./share-metadata";

export const metadata: Metadata = {
    title: 'metadata object title',
    description: 'metadata object description.',
    openGraph: {
        ...openGraphImage,
        title: 'metadata object title',
    },
};

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <>{children}</>
    );
}

export type DateTimeType = {
    fromDateTime: string;
};

export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};