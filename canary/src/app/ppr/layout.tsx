import CartCountProvider from "@/components/CartCountContext";
import Header from "@/components/header";
import CartBar from "@/components/header/CartBar";
import SearchBar from "@/components/header/SearchBar";
import Sidebar from "@/components/sidebar";
import Content from "@/components/sidebar/Content";
import SideHeader from "@/components/sidebar/Header";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./index.css";

export const metadata: Metadata = {
    description: 'A demo of Next.js using Partial Prerendering.',
    metadataBase: new URL(process.env.HOME_URL||''),
    openGraph: {
        title: 'Next.js Partial Prerendering',
        description: 'A demo of Next.js using Partial Prerendering.',
    },
    title: 'Next.js Partial Prerendering',
    twitter: {
        card: 'summary_large_image',
    },
};

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div
            className="overflow-y-scroll bg-gray-1100 bg-[url('/ppr/grid.svg')] pb-36"
        >
            <Sidebar 
                header={<SideHeader />}
            >
                <Content />
            </Sidebar>
            <div
                className="lg:pl-72"
            >
                <div 
                    className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8"
                >
                    <div 
                        className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20"
                    >
                        <div 
                            className="rounded-lg bg-black p-3.5 lg:p-6"
                        >
                            <CartCountProvider>
                                <div
                                    className="space-y-10"
                                >
                                    <Header>
                                        <SearchBar />
                                        <CartBar />
                                    </Header>
                                    {children}
                                </div>
                            </CartCountProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}