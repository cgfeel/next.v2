export async function GET() {
    const id = Date.now();
    const faild = id % 2 === 0;
    const data = faild ? { message: 'not found: ' + id } : [{
        uid: 'test',
        username: 'levi',
        id,
    }];
    return new Response(JSON.stringify(data), {
        status: faild ? 404 : 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}