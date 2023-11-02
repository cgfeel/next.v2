import { TimeType } from "../layout";

export async function fetchData(hash?: string, cache?: CacheType): Promise<TimeType> {
    const data = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Shanghai${hash ? ('?' + hash) : ''}`, {
        cache
    });

    return await data.json();
}

export async function revalidatedData(hash?: string, revalidate?: RevalidateType) {
    const data = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Shanghai${hash ? ('?' + hash) : ''}`, {
        next: { revalidate: revalidate === undefined ? false : revalidate }
    });

    return await data.json();
}

type CacheType = 'force-cache' | 'no-store';
type RevalidateType = false | number;