import Api from "@/src/utils/api";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

interface INextFetchRequestConfig<R extends number | false, T extends string> {
    revalidate?: R;
    tags?: T[];
}

interface IRequestInit<
    R extends number | false, 
    T extends string, 
    H extends Record<string, string>
> extends RequestInit {
    next?: INextFetchRequestConfig<R, T>;
    headers?: Prettify<H>;
}

const createRequest = <
    I extends RequestInfo | URL,
    R extends number | false,
    T extends string,
    H extends Record<string, string>,
    O extends IRequestInit<R, T, H> | undefined
>(
    url: I,
    options?: O
) => {
    const fetcher = async () => {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    };

    const utilities = {
        options,
        url
    } as O extends undefined ? { url: I } : { url: I; options: O };

    return Object.assign(fetcher, utilities);
};

const queryUser = createRequest('/api/user', {
    cache: 'no-cache',
    headers: { 'app-id': '0000', 'authorization ': 'bearer token' },
    next: { revalidate: 60_000, tags: ['dashboard', 'user'] }
});
  
type U = typeof queryUser.url;
  
type C = typeof queryUser.options.cache;
  
type T = (typeof queryUser.options.next.tags)[number];
  
type R = typeof queryUser.options.next.revalidate;
  
type H = typeof queryUser.options.headers;

// export const runtime = 'edge';

/*const makeFetch = (url: string) => {
    return fetch(url).then((res) => res.json());
};

makeFetch().then(data => {});*/

export default async function Page() {
    const blob = await Api.get<{ hello: string }>('/api/edge/blob', {
        next: { tags: ['user'] }
    });

    return (
        <div>
            blob: {JSON.stringify(blob)}, api extends fetch to provide convenient data request.
        </div>
    );
}