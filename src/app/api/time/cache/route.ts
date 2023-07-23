export async function GET() {
    const data = { time: Date.now() };
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }, 
    });
}

export async function POST() {
    const data = { time: Date.now() };
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }, 
    });
}