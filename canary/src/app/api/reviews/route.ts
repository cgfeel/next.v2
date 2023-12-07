import { NextRequest } from "next/server";
import { sleep } from "../list";

const list = [{"id":"1","name":"Nullam Duis","rating":4,"text":"Phasellus efficitur, nisi ut varius ultricies, tortor arcu ullamcorper nisi, eu auctor enim est ut enim. Sed fringilla, nulla ut tincidunt hendrerit, risus tortor laoreet tortor, non mattis arcu elit vel ante."},{"id":"2","name":"Donec Nulla Velit","rating":1,"text":"Nullam fermentum nisl non mattis fringilla!!!!"},{"id":"3","name":"J Tempus","rating":3,"text":"Pellentesque faucibus quam eu vehicula pulvinar. Integer cursus fringilla metus."}];

export async function GET(request: NextRequest) {
    const delay = parseInt(request.nextUrl.searchParams.get('delay')||'0');

    if (delay > 0) {
        await sleep(delay);
    }

    return new Response(JSON.stringify(list), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}