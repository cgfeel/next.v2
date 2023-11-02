'use server'

import { cookies } from "next/headers";

export async function send(message: string) {
    const cart = cookies().get('myCookie')?.value;
    console.log(cart, message);
}