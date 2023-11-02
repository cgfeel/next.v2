'use client'

import { useTransition } from "react"
import { addItem } from "../action";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    return (
        <button
            disabled={isPending}
            onClick={() => startTransition(() => addItem().then(() => undefined))}
        >
            transition Add to Cart
        </button>
    );
}