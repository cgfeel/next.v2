import { Suspense } from "react";
import FormBtn from "./FormBtn";

export default function Page() {
    return (
        <div>
            <p>click btn to server action.</p>
            <Suspense fallback={null}>
                <FormBtn />
            </Suspense>
        </div>
    );
}
