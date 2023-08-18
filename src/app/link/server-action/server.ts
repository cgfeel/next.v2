import { cache } from "react";

export type MethodType = (val: number) => number;

let num = 0;

export const getNum: (reset: number|MethodType) => Promise<number> = cache(async (reset) => {
    num = typeof reset === 'function' ? reset(num) : reset;
    return num;
});