'use client'

import { ReadonlyURLSearchParams, usePathname, useRouter } from "next/navigation";

type RedirectAction = (searchParams: ReadonlyURLSearchParams) => void;

const useRedirect: () => RedirectAction = () => {
    const pathname = usePathname();
    const router = useRouter();
    
    return (searchParams) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("email");
        params.delete("form");

        const path = [pathname, params.toString()].filter(i => i);
        router.replace(`${path.join('?')}`);
    };
};

export default useRedirect;