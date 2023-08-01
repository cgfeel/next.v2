'use client'

import Script from "next/script";

export default function Page() {
    return (
        <Script
            src="https://example.com/script.js"
            onError={(e: Error) => {
                console.log('Script failed to load', e);
            }}
        />
    );
}