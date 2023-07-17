'use client'
export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    try {
        return (
            <div>
                <h2>Something went wrong - {error.message}!</h2>
                <button
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </div>
        );
    } catch (e: Error) {
        return (
            <>test</>
        );
    }
}