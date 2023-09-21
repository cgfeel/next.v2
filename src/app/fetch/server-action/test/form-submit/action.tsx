'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const submitEmail = async (data: FormData) => {
    const email = data.get('email');
    console.log(email);
    if (email) {
        revalidatePath('/fetch/server-action/test/form-submit');
        redirect(`/fetch/server-action/test/form-submit?form=success&email=${email}`);
    }
    return;
}