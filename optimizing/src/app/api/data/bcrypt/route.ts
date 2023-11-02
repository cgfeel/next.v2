import { hash } from "bcryptjs";
import { NextRequest } from "next/server";

export async function GET(res: NextRequest) {
    const { headers } = res;
    const time = headers.get('x-time');

    if (time === null) {
        return new Response(JSON.stringify({
            val: 'await header request',
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }, 
        });
    }

    const val = await hash(time, 12);
    return new Response(JSON.stringify({ val }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }, 
    });
}