import { draftMode } from "next/headers";
// import { NextResponse } from "next/server";

export async function GET() {
    draftMode().disable();
    // NextResponse.redirect('/blog/draft');
    return new Response(JSON.stringify({ message: 'redirect' }), {
        status: 307,
        headers: {
            'Content-Type': 'application/json',
            'Location': '/blog/draft',
            'X-Atlassian-Token': 'no-check'
        },
    });
}