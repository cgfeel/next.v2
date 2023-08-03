'use client'

import { useState } from "react";
import Fuse from "fuse.js";

const names = ['Tim', 'Joe', 'Bel', 'Lee'];

export default function Page() {
    const [results, setResults] = useState<Fuse.FuseResult<string>[]|undefined>();
    return (
        <div>
            <input 
                type="text"
                placeholder="Search"
                onChange={async (e) => {
                    const { value } = e.currentTarget;

                    // Dynamically load fuse.js
                    const Fuset = (await import('fuse.js')).default;
                    const fuse = new Fuset(names);

                    setResults(fuse.search(value));
                }}
            />
            <pre>Results: {JSON.stringify(results, null, 2)}</pre>
        </div>
    );
}