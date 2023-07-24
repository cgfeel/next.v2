'use server'

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

// 这里的阻塞在生产环境无效
export const action = async () => {
    await sleep(5);
    return true;
};