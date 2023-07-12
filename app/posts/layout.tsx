import { Suspense } from "react";
import { NavigationEvent } from "./components/NavigationEvent";

export default function PostsLayout({ children }) {
    return (
        <>
            {children}
            <Suspense fallback={null}>
                <NavigationEvent />
            </Suspense>
        </>
    );
}