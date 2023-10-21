import { revalidatePath } from "next/cache";
import { setPower } from "../../action";

export default function Page() {
    async function login() {
        'use server'
        await setPower();
        revalidatePath('/file/power');
    }
    return (
        <form
            action={login}
        >
            <button
                type="submit"
            >
                login to power
            </button>
        </form>
    );
}