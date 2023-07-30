import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // no power
    if (request.nextUrl.pathname.startsWith('/nopower')) {
        return new NextResponse(JSON.stringify({
            success: false, message: 'authentication failed',
        }), {
            status: 401,
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    // set request header
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-hello-from-middleware1', 'hello');

    // set cookies and headers
    const res = NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });

    res.cookies.set("myCookie", 'cookies from root(src) middleware', {
        path: "/",
        httpOnly: true,
    });

    res.headers.set('x-hello-from-middleware2', 'hello');

    // rewrite photo
    if (request.nextUrl.pathname.startsWith('/tophoto')) {
        return NextResponse.rewrite(new URL('/photo', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/optimizing-dashboard')) {
        return NextResponse.rewrite(new URL('/optimizing/link/dashboard', request.url));
    }
    return res;
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};