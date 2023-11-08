import { draftMode } from "next/headers";
// import { NextResponse } from "next/server";

function getPostBySulg(slug: string): Promise<{ slug: string }|undefined> {
    return new Promise(resolve => {
        setTimeout(
            () => resolve(slug === 'fail' ? undefined : { slug: '/optimizing/draft' }), 
            slug.length * 100 || 500
        );
    });
}

// route handler with secret and slug
export async function GET(request: Request) {
    // Parse query string parameters
    const { searchParams } = new URL(request.url);

    const secret = searchParams.get('secret');
    const slug = searchParams.get('slug');

    // Check the secret and next parameters
    // This secret should only be known to this route handler and the CMS
    if (secret !== 'MY_SECRET_TOKEN' || !slug) {
        return new Response('Invalid token', { status: 401 });
    }

    // Fetch the headless CMS to check if the provided `slug` exists
    // getPostBySlug would implement the required fetching logic to the headless CMS
    const post = await getPostBySulg(slug);

    // If the slug doesn't exist prevent draft mode from being enabled
    if (!post) {
        return new Response('Invalid slug', { status: 401 });
    }

    // Enable Draft Mode by setting the cookie
    draftMode().enable();

    // Redirect to the path from the fetched post
    // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
    // NextResponse.redirect(post.slug);
    return new Response(JSON.stringify({ message: 'redirect' }), {
        status: 307,
        headers: {
            'Content-Type': 'application/json',
            'Location': post.slug,
            'X-Atlassian-Token': 'no-check'
        },
    });
}