import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request: Request, { params }: { 
    params: { slug: string[] };
}) {
    const { slug } = params;
    const link = slug.shift();

    if (!link) {
        const referer = request.headers.get('referer');
        if (!referer) {
            return new Response('Not Found', {
                status: 404
            });
        }
        redirect(referer);
    }

    const path = decodeURIComponent(link);
    revalidatePath(path);

    slug.forEach(key => revalidateTag(key));
    redirect(path);
}