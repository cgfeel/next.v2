import { NextRequest, NextResponse } from "next/server";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/optimizing-dashboard')) {
        return NextResponse.rewrite(new URL('/optimizing/link/dashboard', request.url));
    }

    // 'nonce-${nonce}' 'strict-dynamic'
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
        default-src 'self' www.google-analytics.com;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net www.googletagmanager.com www.google-analytics.com example.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: www.googletagmanager.com github.com assets.vercel.com;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `;
    
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set(
        'Content-Security-Policy',
        // Replace newline characters and spaces
        cspHeader.replace(/\s{2,}/g, ' ').trim()
    );

    return NextResponse.next({
        headers: requestHeaders,
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        /** 
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};