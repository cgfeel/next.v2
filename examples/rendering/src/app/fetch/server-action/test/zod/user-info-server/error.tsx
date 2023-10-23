'use client';

export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <h2>Fetch error, U can reset it.</h2>
            <div>{new Date().toLocaleString()}</div>
            <button
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
}