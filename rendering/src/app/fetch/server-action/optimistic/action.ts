'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function get(name: string): Promise<string[]> {
    const cart = cookies().get(name)?.value;
    return cart ? JSON.parse(cart) : [];
}

export async function remove(name: string, index: number) {
    const cart = await get(name);
    const cookieStore = cookies();

    revalidatePath('/fetch/server-action/optimistic');
    if (index < cart.length) {
        cart.splice(index, 1);
        cart.length > 0 ? cookieStore.set(name, JSON.stringify(cart)) : cookieStore.delete(name);
    }
}

export async function send(name: string, message: string, create?: boolean) {
    const cart = await get(name);
    revalidatePath('/fetch/server-action/optimistic');

    if (cart.length === 0 || !create) {
        const data = [...cart, message];
        cookies().set(name, JSON.stringify(data));
    }
}