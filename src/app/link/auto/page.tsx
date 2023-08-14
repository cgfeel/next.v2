import { revalidatePath, revalidateTag } from "next/cache";
import Link from "next/link";
import { action } from "./action";

// invalid
// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';
// export const revalidate = 0;

export default function Page() {

    // invalid
    // action().then(success => console.log(success, 'say hi'));

    // invalid
    // revalidatePath('/link/fetch');
    // revalidatePath('/link/auto');
    // revalidateTag('dynamic-auto-fetch');

    return (
        <div>
            <div>通过get请求跳转是不能刷新视图的，哪怕通过嘞中间请求清除了tag和path</div>
            <hr />
            <Link href={'/api/time/link'}>auto link</Link>
            <hr />
            <Link href="/link/fetch">auto fetch</Link>
            <hr />
            <a href="/api/time/link">api link by org</a>
            <hr />
            <a href="/link/fetch">fetch link by org</a>
            {/* invalid <Link href={`/api/time/link?${Date.now()}`}>auto link</Link>*/}
        </div>
    );
}