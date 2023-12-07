'use client'

import { useCartCount } from "@/components/CartCountContext";
import { useRouter } from "next/navigation";
import { FC, useCallback, useTransition } from "react"

const AddToCart: FC<AddToCartProps> = ({ initialCartCount }) => {
    const [, setOptmisticCartCount] = useCartCount(initialCartCount);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const addToCart = useCallback(() => {
        const count = initialCartCount + 1;
        setOptmisticCartCount(count);

        // update the cart count cookie
        document.cookie = `_cart_count=${count}; path=/; max-age=${60 * 60 * 24 * 30}`;

        // Normally you would also send a request to the server to add the item
        // to the current users cart
        // await fetch(`https://api.acme.com/...`)

        // Use a transition and isPending to create inline loading UI
        startTransition(() => {
            setOptmisticCartCount(null);

            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state
            router.refresh();

            // We're working on more fine-grained data mutation and revalidation:
            // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
        });
    }, [initialCartCount, router, setOptmisticCartCount, startTransition]);

    return (
        <button
            className="relative w-full items-center space-x-2 rounded-lg bg-vercel-blue px-3 py-1  text-sm font-medium text-white hover:bg-vercel-blue/90 disabled:text-white/70"
            onClick={addToCart}
            disabled={isPending}
        >
            Add to Cart
            {isPending && (
                <div
                    className="absolute right-2 top-1.5"
                    role="status"
                >
                    <div
                        className="h-4 w-4 animate-spin rounded-full border-[3px] border-white border-r-transparent"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </button>
    );
};

export interface AddToCartProps {
    initialCartCount: number;
}

export default AddToCart;