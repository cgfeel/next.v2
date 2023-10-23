'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const flush = async () => {
    revalidatePath('/fetch/server-action/post');
};

export const removeAction = async () => {
    cookies().delete('flush-test-time');
    revalidatePath('/fetch/server-action/post');
}

export const resetServerSide = async () => {
    const cookieStore = cookies();
    cookieStore.set('flush-test-time', new Date().toLocaleString());

    revalidatePath('/fetch/server-action/post');
};