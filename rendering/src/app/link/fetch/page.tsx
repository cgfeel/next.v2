import Api from "@/src/utils/api";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { TimeType } from "../../blog/time/page";

export const revalidate = 0;

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        cache: 'no-cache',
        next: {
            tags: ['dynamic-auto-fetch'],
        },
    });

    async function update() {
        'use server'
        revalidateTag('dynamic-auto-fetch');
        revalidatePath('/link/ramdom');
    }

    return (
        <div>
            <pre>{JSON.stringify(data, null, 4)}</pre>
            <form
                action={update}
            >
                <button type="submit">update</button>
            </form>
        </div>
    );
}