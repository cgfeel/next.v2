import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const url = id === null ? 'https://jsonplaceholder.typicode.com/posts' : `https://jsonplaceholder.typicode.com/posts/${id}`;
    
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const product = await res.json();

    const cookieStore = cookies();
    const token = cookieStore.get('user_device_id_timestamp');

    return new Response(JSON.stringify({ [id === null ? 'data' : 'product']: product }), {
        status: 200,
        headers: {
            'Set-Cookie': `user_device_id_timestamp=${token?.value}`,
            'Content-Type': 'application/json',
        },
    });
}

export async function POST() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
    });

    const data = await res.json();

    const headersList = headers();
    const CfRay = headersList.get('X-Content-Type-Options')||'crf-none';

    // return NextResponse.json(data);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'X-Content-Result-Options': CfRay,
        },
    });
}