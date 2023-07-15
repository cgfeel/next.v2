'use client'
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function NavigationEvent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        console.log(url)
    }, [pathname, searchParams]);

    return null;
}