'use server'

import { revalidatePath, revalidateTag } from "next/cache";

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

// 这里的阻塞在生产环境无效
export const action = async () => {
    await sleep(1000);
    revalidatePath('/link/fetch');
    revalidatePath('/link/auto');
    revalidateTag('dynamic-auto-fetch');
    return true;
};