import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = cookies();
    cookieStore.set('flush-test-time', new Date().toLocaleString());

    return new Response(JSON.stringify({ message: 'success' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}