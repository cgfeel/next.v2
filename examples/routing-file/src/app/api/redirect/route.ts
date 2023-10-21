// import { redirect } from "next/navigation";

export async function GET() {
    // redirect('https://www.baidu.com');
    return new Response(JSON.stringify({ message: 'redirect' }), {
        status: 307,
        headers: {
            'Content-Type': 'application/json',
            'Location': 'https://www.baidu.com',
            'X-Atlassian-Token': 'no-check'
        },
    });
}