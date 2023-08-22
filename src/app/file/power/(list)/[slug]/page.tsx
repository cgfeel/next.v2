import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { setPower } from "../../action";

const checkPage: (slug: string) => void = slug => {
    const id = parseInt(slug)||0;

    if (0 >= id || 3 < id) {
        notFound();
    }
};

export const revalidate = 0;

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    async function logout() {
        'use server'
        await setPower(false);
        revalidatePath('/file/power/[slug]');
    }

    checkPage(slug);

    return (
        <div>
            <div>page slug: {slug}</div>
            <hr />
            <form
                action={logout}
            >
                <button type="submit">logout</button>
            </form>
        </div>
    );
}