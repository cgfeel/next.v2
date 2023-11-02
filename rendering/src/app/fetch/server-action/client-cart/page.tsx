'use client'

import { addItem } from "./action";

export default function Page() {
    return (
        <form 
            action={addItem}
        >
            <button type="submit">Add to Client Cart</button>
        </form>
    );
}