import Link from "next/link";

export const revalidate = 0;

export default function Page() {
    const ramdom = Date.now();
    return (
        <div>
            <div>①点击链接到`fetch`；②在`fetch`操作`update`；③回到`ramdom`查看ramdom</div>
            <hr />
            <div>ramdom:{ramdom}</div>
            <Link href={`/link/fetch?${ramdom}`}>auto link ramdom</Link>
        </div>
    );
}