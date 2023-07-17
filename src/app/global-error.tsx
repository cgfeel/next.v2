'use client'

export default function GlobalError({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    return (
        <html lang="en">
          <body className={inter.className}>
            <div>
                <h2>Global went wrong - {error.message}!</h2>
                <button
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </div>
          </body>
        </html>
    );
}