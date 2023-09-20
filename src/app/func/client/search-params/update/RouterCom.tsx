'use client'

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";

const RouterCom: FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const searchParamsData = searchParams.toString();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString: (name: string, value: string) => string = useCallback((name, value) => {
        const params = new URLSearchParams(searchParamsData);
        params.set(name, value);

        return params.toString();
    }, [searchParamsData]);

    return (
        <div>
            <h1>Update sort by: </h1>
            <div>
                <button
                    onClick={() => router.push(`${pathname}?${createQueryString('sort', 'asc')}`)}
                >
                    using useRouter up to asc
                </button>
            </div>
            <div>
                <Link
                    href={`${pathname}?${createQueryString('sort', 'desc')}`}
                >
                    using link up to desc
                </Link>
            </div>
        </div>
    );
};

export default RouterCom;