'use client'

import { resetServerSide } from "../action";

export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    const resetHandle = async () => {
        await resetServerSide();
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