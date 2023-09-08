export const runtime = 'edge';

export async function GET() {
    const obj = { hello: "world" };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
        type: "application/json",
    });
    return new Response(blob);
}