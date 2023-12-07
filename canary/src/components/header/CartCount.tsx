'use client';

import { FC } from "react";
import { useCartCount } from "../CartCountContext";

const CartCount: FC<CartCountProps> = ({ initialCartCount }) => {
    const [count] = useCartCount(initialCartCount);
    return <span>{count}</span>;
};

export interface CartCountProps {
    initialCartCount: number;
}

export default CartCount;