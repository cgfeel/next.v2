import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export default function Layout({ children }: PropsWithChildren<>) {
    return (
        <>
            <div>
                <Link href="/link/fetch">fetch</Link>
                {' | '}
                <Link href="/link/auto">auto</Link>
                {' | '}
                <Link href="/link/ramdom">ramdom</Link>
                {' | '}
                <Link href="/link/client">client</Link>
                {' | '}
                <Link href="/link/server-action">server-action</Link>
            </div>
            <hr />
            {children}
        </>
    );
}