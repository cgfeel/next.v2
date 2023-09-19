import Api from "@/src/utils/api";
import { cookies } from "next/headers";

export type CommentItemType = {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
};

const range = ['1', '2', '3'];

export async function GET(request: Request, { params }: {
    params: { id: `${number}` };
}) {
    const { id } = params;

    if (range.indexOf(id) < 0) {
        const cookieStore = cookies();
        const token = cookieStore.get('flush-test-time');

        if (!token?.value) {
            return new Response(JSON.stringify({ message: 'not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    const data = await Api.get<CommentItemType[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}