'use client'

import { useRouter } from "next/navigation";
import { FC } from "react";

const Client: FC = () => {
    const router = useRouter();
    
    return (
        <ul>
            <li>
                <button
                    type="button"
                    onClick={() => router.push('/func/client/shop/1/3', { scroll: false })}
                >
                    push to shop and disable to top
                </button>
            </li>
            <li>
                <button
                    type="button"
                    onClick={() => router.replace('/func/client/shop/1/4')}
                >
                    replace to shop
                </button>
            </li>
            <li>
                <button
                    type="button"
                    onClick={() => router.refresh()}
                >
                    refresh current page
                </button>
            </li>
            <li>
                <button
                    type="button"
                    onClick={() => router.prefetch('/func/client/shop/1/4')}
                >
                    prefetch to shop
                </button>
            </li>
            <li>
                <button
                    type="button"
                    onClick={() => router.back()}
                >
                    Navigate back
                </button>
            </li>
            <li>
                <button
                    type="button"
                    onClick={() => router.forward()}
                >
                    Navigate forward
                </button>
            </li>
        </ul>
    );
};

export default Client;