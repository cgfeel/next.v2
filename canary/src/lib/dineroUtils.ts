import { Product } from "@/components/product/product";
import { Dinero, multiply, toDecimal } from "dinero.js";

export function formatDiscount(price: Dinero<number>, discountRaw: Product['discount']) {
    return !discountRaw ? undefined : {
        amount: multiply(price, {
            amount: discountRaw.percent,
            scale: 2,
        }),
        expirts: discountRaw.expires,
    };
}

export function productCurrencySymbol(dinero: Dinero<number>): string {
    const code = toDecimal(dinero, ({ currency }) => currency.code);
    switch (code) {
        case 'EUR': return '€';
        case 'GBP': return '£';
        case 'RMB': return '￥';
        default: return '$';
    }
};