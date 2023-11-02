'use client';

import { useRouter } from "next/navigation";
import { FC } from "react";

interface ButtonToPostProps {
    pid: number;
    prefetch?: boolean;
}

const ButtonToPost: FC<ButtonToPostProps> = ({ pid, prefetch = false }) => {
    const router = useRouter();
    return (
        <button 
            onClick={() => prefetch ? router.push(`/posts/${pid}`) : router.push(`/posts/${pid}`)}
        >
            click to post: {pid}
        </button>
    );
};

export default ButtonToPost;