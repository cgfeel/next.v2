import { revalidatePath, revalidateTag } from "next/cache";
// import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export function GET() {
    revalidatePath('/link/fetch');
    revalidatePath('/link/auto');
    revalidateTag('dynamic-auto-fetch');
    // redirect('/link/fetch');
    return new Response(JSON.stringify({ message: 'redirect' }), {
        status: 307,
        headers: {
            'Content-Type': 'application/json',
            'Location': '/link/fetch',
            'X-Atlassian-Token': 'no-check'
        },
    });
}