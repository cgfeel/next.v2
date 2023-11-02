'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addItem() {
    cookies().set('ramdom', Math.random().toString());
    cookies().set('ramdom-secure', Math.random().toString(), { secure: true })
    cookies().set({
        name: 'ramdom-time',
        value: new Date().toLocaleString(),
        httpOnly: true,
        path: '/',
    });
    revalidatePath('/func/cookies');
}

export async function changeItem() {
    const cookieStore = cookies();
    const has = Boolean(cookieStore.get('author-name'));
    const oneDay = 24 * 60 * 60 * 1000;
    if (has) {
        cookieStore.set('author-age', '');
        cookieStore.delete('author-name');
        cookieStore.set('author-sex', 'man', { maxAge: 0 });
        cookieStore.set('author-location', 'shanghai', { expires: Date.now() - oneDay });
    } else {
        cookieStore.set('author-age', '18');
        cookieStore.set('author-name', 'levi');
        cookieStore.set('author-sex', 'man');
        cookieStore.set('author-location', 'shanghai');
    }
    revalidatePath('/func/cookies');
}