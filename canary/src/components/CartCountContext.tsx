'use client';

import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

type CountType = null | number;
type CountState = [CountType, Dispatch<SetStateAction<CountType>>];

const CartCountContext = createContext<CountState | undefined>(undefined);

const CartCountProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [optimisticCartCount, setOptimisticCartCount] = useState<CountType>(null);
    return [
        <CartCountContext.Provider
            value={[optimisticCartCount, setOptimisticCartCount]}
            key="cartCount"
        >
            {children}
        </CartCountContext.Provider>
    ];
};

export function useCartCount(initialCount: number): CountState {
    const context = useContext(CartCountContext);
    if (context === undefined) {
        throw new Error('useCartCount must be used within a CartCountProvider');
    }
    if (context[0] === null) {
        return [initialCount, context[1]];
    }
    return context;
}

export default CartCountProvider;