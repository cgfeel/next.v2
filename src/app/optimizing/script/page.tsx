import Script from "next/script";

export default function Page() {
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