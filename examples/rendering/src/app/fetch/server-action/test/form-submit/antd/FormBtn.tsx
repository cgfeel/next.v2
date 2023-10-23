'use client';

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { submitAction } from "./action";

const FormBtn: FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const form = searchParams.has('form') && searchParams.get('form');
        const email = searchParams.get('email') && searchParams.get('email');

        if (form === 'faild' && email) {
            router.replace(pathname);
        }
    }, [pathname, searchParams, router]);

    return (
        <div>
            <form
                action={submitAction}
            >
                <button type="submit">submit to server action.</button>
            </form>
        </div>
    );
};

export default FormBtn;