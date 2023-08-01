import Script from "next/script";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>layout load math.js</div>
            <hr />
            {children}
            <Script
                src="https://cdn.jsdelivr.net/npm/mathjs@11.9.1/lib/browser/math.min.js"
                strategy="afterInteractive"
            />
        </div>
    );
}