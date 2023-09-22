'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const submitEmail = async (data: FormData) => {
    const email = data.get('email');
    console.log(email);
    if (email) {
        if (email === 'jht2718@163.com') {
            return {
                error: true,
                message: 'email is subscribed.'
            };
        }
        redirect(`/fetch/server-action/test/form-submit?form=success&email=${email}`);
    }
}