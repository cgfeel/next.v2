import { Metadata } from "next";
import { PropsWithChildren, ReactNode } from "react";
import './global.css'

export const metadata: Metadata = {
    title: 'NextGram',
    description: 'A sample Next.js app showing dynamic routing with modals as a route.',
    metadataBase: new URL(`${process.env.HOME_URL}/photo`),
};

export default function Layout({ children, modal }: PropsWithChildren<{
    modal: ReactNode;
}>) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}