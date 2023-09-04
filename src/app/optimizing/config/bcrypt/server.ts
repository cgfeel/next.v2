import { cache } from "react";

let num = 0;

export const getTime: (val?: number) => number = cache(val => {
    if (val !== undefined) num = val;
    return num;
});