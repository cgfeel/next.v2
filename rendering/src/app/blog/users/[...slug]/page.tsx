import Link from "next/link";

export async function generateStaticParams() {
    return [{ slug: ['a', '1'] }, { slug: ['b', '2'], }, { slug: ['c', '3'] }];
}

export default function BolgUsersPage({ params }: { params: { slug: string[] } }) {
    const { slug: [type, id] } = params;
    return (
        <div>
            <div>blog-slug-type:{type}-type:{id}</div>
            <div>
                <Link
                    href={"/"}
                >
                    <span>Web 链接</span>
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                </Link>
            </div>
        </div>
    );
}