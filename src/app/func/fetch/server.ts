import { TimeType } from "../../blog/time/page";

type CacheType = 'force-cache' | 'no-store';
type RevalidateType = false | number;

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