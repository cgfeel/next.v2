export const runtime = 'edge';

export async function GET() {
    const obj = { hello: "world" };
    const blob = JSON.stringify(obj);
    /*const blob = new Blob([JSON.stringify(obj)], {
        type: "application/json",
    });*/
    return new Response(blob, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }, 
    });
}

/*export async function GET() {
    const obj = { hello: "world" };
    return new Response(JSON.stringify(obj));
}*/