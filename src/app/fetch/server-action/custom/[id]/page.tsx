import LikeButton from "./LikeButton";

function sleep(id: string, time?: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`post:id:${id}`), time||500);
    });
}

export default function Page({ params: { id } }: { 
    params: { id: string };
}) {
    async function increment() {
        'use server'

        const tips = await sleep(id);
        console.log(tips);
    }

    return (
        <LikeButton increment={increment} />
    );
}