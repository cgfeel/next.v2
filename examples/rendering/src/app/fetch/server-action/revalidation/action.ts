'use server'

import { revalidateTag } from "next/cache";

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

// 这里的阻塞会等待完成后刷新视图
export const action = async (formData: FormData) => {
    await sleep(5000);
    const data = formData.get('flush')?.toString()||'';
    const flush = parseInt(data)||0;
    if (flush > 0) {
        revalidateTag('collection');
    }
    return true;
};