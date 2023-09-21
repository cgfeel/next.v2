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
        
        router.replace(`${pathname}?${params.toString()}`);
    };
};

export default useRedirect;