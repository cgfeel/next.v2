'use client'
import { useRouter } from "next/navigation";
import { FC } from "react";

const ButtonToPost: FC<{ pid: number; }> = ({ pid }) => {
    const router = useRouter();
    return (
        <button 
            onClick={() => router.push(`/posts/${pid}`)}
        >
            click to post: {pid}
        </button>
    );
};

export default ButtonToPost;