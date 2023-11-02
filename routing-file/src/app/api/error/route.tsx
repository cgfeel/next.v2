export async function GET() {
    return new Response(JSON.stringify({
        message: "Page was not fond!",
    }), {
        status: 404,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST() {
    return new Response(JSON.stringify({
        message: "Something went wrong!",
    }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}