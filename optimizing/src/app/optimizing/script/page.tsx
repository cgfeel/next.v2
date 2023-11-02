// import { headers } from "next/headers";
import Script from "next/script";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

export default function Page() {
    // const nonce = headers().get('x-nonce')||'';
    return (
        <div>
            <div>page load loadsh and jQuery</div>
            <hr />
            <div
                id="show-banner-html"
            />
            <hr />
            <div
                id="show-banner-box"
            />
            <hr />
            <Script
                src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"
                strategy="afterInteractive"
            />
            <Script 
                src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js" 
                strategy="lazyOnload" 
            />
            <Script
                id="show-banner-html-script"
            >
                {`
                    const banner_html = document.getElementById('show-banner-html');
                    banner_html.style.cssText = 'height: 100px; background: #f00; color: #fff';
                    banner_html.innerText = "It's banner box-html.";
                `}
            </Script>
            <Script
                id="show-banner-box-script"
                dangerouslySetInnerHTML={{
                    __html: `
                        const banner_box = document.getElementById('show-banner-box');
                        banner_box.style.cssText = 'height: 100px; background: #0f0; color: #f00';
                        banner_box.innerText = "It's banner box-warp.";
                    `,
                }}
            />
        </div>
    );
}