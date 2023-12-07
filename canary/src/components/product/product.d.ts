import { Currency, DineroSnapshot } from "dinero.js";

/*type Currency = {
    base: number;
    code: string;
    scale: number;
};*/

type Discount = {
    percent: number;
    expires?: number;
};

/*type Price = {
    amount: number;
    currency: Currency;
    scale: number;
};*/

type Price = DineroSnapshot<number>;

type UsedPrice = {
    amount: number;
    currency: Currency<number>;
    scale: number;
};

export type Product = {
    description: string;
    id: string;
    image: string;
    isBestSeller: boolean;
    leadTime: number;
    name: string;
    price: Price;
    rating: number;
    stock: number;
    discount?: Discount;
    imageBlur?: string;
    usedPrice?: UsedPrice;
};

export type ReviewType = {
    id: string;
    name: string;
    rating: number;
    text: string;
};