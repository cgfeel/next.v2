'use server'

import { cookies } from "next/headers";

export async function addItem() {
    const cart = cookies().get('myCookie')?.value;
    console.log(cart);
    return true;
}