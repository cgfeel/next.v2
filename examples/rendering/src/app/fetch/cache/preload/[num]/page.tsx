import TimeInfo, { preload } from "../service";

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), time);
    });
}

export default async function Page({ params: { num } }: {
    params: { num: string };
}) {
    const val = Math.abs(parseInt(num)||1);
    preload(val);
    
    const condition = await sleep(1000);
    return condition ? <TimeInfo num={1} /> : (
        <div>is none</div>
    );
}