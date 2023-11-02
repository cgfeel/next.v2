import Api from "@/src/utils/api";
import { revalidateTag } from "next/cache";
import Form from "./Form";
import { getTime } from "./server";

export default async function Page() {
    const time = await getTime();
    const data = await Api.get<{ val: string }>('/api/data/bcrypt', {
        headers: time === 0 ? {} : { 
            'x-time': time.toString() 
        },
        next: { tags: ['timeData'] }
    });

    async function update() {
        'use server'
        await getTime(Date.now());
        revalidateTag('timeData');
    }

    return (
        <div>
            <div>{data.val}</div>
            <hr />
            <Form
                action={update}
            >
                <button type="submit">update</button>
            </Form>
        </div>
    );
}