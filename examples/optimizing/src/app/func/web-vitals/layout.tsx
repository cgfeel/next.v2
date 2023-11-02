// import { headers } from "next/headers";
import Link from "next/link";
import Script from "next/script";
import { PropsWithChildren } from "react";
import NavigationEvent from "./components/NavigationEvent";
import { GA_TRACKING_ID } from "./lib/gtag";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

export default function Layout({ children }: PropsWithChildren<{}>) {
    // const nonce = headers().get('x-nonce')||'';
    return (
        <>
            <Script
                id="show-ga-layer"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                async
            />
            <NavigationEvent />
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link href="/func/web-vitals">Home</Link>
                        </li>
                        <li>
                            <Link href="/func/web-vitals/about">About</Link>
                        </li>
                        <li>
                            <Link href="/func/web-vitals/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <hr />
            {children}
        </>
    );
}