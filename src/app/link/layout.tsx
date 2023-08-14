import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
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
            </div>
            <hr />
            {children}
        </>
    );
}