import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { FC, Suspense } from "react";
import CartCountFromCookies from "./CartCountFromCookies";
import Image from "next/image";

const CartBar: FC = () => (
    <div 
        className="flex shrink-0 gap-x-3"
    >
        <div 
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-600 text-white"
        >
            <ShoppingCartIcon className="w-6 text-white" />
            <div 
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-vercel-cyan text-sm font-bold text-cyan-800"
            >
                <Suspense
                    fallback={<span></span>}
                >
                    <CartCountFromCookies />
                </Suspense>
            </div>
        </div>
        <Image
            alt="User"
            className="rounded-full"
            src="/ppr/prince-akachi-LWkFHEGpleE-unsplash.png"
            width={40}
            height={40}
            priority
        />
    </div>
);

export default CartBar;