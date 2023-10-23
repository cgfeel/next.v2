import { cache } from "react";

let num = 1;

export const getTime: () => number = cache(() => {
    if (num > 5) num = 1;
    return num++;
});