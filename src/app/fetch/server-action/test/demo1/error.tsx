'use client'

import { refresh } from "./action";

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    const resetHandle = async () => {
        await refresh();
        // await sleep(2000);
        reset();
    };
    return (
        <div>
            <h2>Something went wrong - {error.message}</h2>
            <div>{new Date().toLocaleString()}</div>
            <button
                onClick={() => resetHandle()}
            >
                Try again
            </button>
        </div>
    );
}