import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    request: Request, 
    { params }: { params: { slug: string } }
) {
    const { slug } = params;
    return NextResponse.json({ slug });
}

export async function POST(request: Request, { params } : {
    params: { slug: string };
}) {
    const { slug } = params;
    const data = await (slug === 'json' ? request.json() : request.formData().then(res => {
        const data = {} as Record<string, FormDataEntryValue>;
        
        res.forEach((value, key) => data[key] = value);
        return data;
    }));

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}