import { cookies } from "next/headers";
import { action } from "./action";

export default function page() {

    async function submitImage(formData: FormData) {
        'use server'

        try {
            const info = await action(formData);
            console.log(info);

            cookies().set({
                name: 'cartId',
                value: info.data.id.toString(),
                httpOnly: true,
                path: '/',
            });
            return info;
        } catch (error) {
            console.log((error as Error).message);
        }
        
        return {
            success: false,
        };
    }
    return (
        <form
            action={submitImage}
        >
            <input 
                type="text" 
                name="name" 
                style={{ backgroundColor: '#666' }}
            />
            <button
                type="submit"
            >
                send data
            </button>
        </form>
    );
}