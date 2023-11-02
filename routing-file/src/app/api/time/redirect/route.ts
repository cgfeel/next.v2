export async function GET() {
    const res = await fetch('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0',
        }, 
    });
}

export const revalidate = 0;