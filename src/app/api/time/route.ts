export async function GET() {
    const data = { time: Date.now() };
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0',
        }, 
    });
}

export const revalidate = 0;