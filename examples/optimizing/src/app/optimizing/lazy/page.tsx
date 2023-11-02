'use client'

import dynamic from "next/dynamic";
import { FC, useState } from "react";

// Client Components:
const ComponentA = dynamic(() => import('./components/ComA'));
const ComponentB = dynamic(() => import('./components/ComB'));
const ComponentC = dynamic(
    () => import('./components/ComC'), 
    { 
        loading: () => <p>Loading...</p>,
        ssr: false,
    }
);

const ClientComponent = dynamic(
    () => import('./components/Hello').then(mod => mod.Hello)
);

const ShowComponent: FC = () => {
    const [showMore, setShowMore] = useState(false);
    return (
        <>
            {showMore && <ComponentB />}
            <button onClick={() => setShowMore(!showMore)}>Toggle</button>
        </>
    );
};

export default function Page() {
    return (
        <div>
            {/* Load immediately, but in a separate client bundle */}
            <ComponentA />
            <hr />

            {/* Load on demand, only when/if the condition is met */}
            <ShowComponent />
            <hr />

            {/* Load only on the client side */}
            <ComponentC />
            <hr />
            
            <ClientComponent />
            <hr />
        </div>
    );
}