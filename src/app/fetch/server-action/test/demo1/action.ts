'use server';

import { revalidatePath } from 'next/cache';

export const refresh = async () => {
    revalidatePath('/fetch/server-action/test/demo1');
};