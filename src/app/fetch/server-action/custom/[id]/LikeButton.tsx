'use client'

import { FC } from "react";

const LikeButton: FC<{ increment: () => Promise<void> }> = ({ increment }) => (
    <button
        onClick={async () => {
            await increment();
        }}
    >
        Like
    </button>
);

export default LikeButton;