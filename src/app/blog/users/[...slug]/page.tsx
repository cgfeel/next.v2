export async function generateStaticParams() {
    return [{ slug: ['a', '1'] }, { slug: ['b', '2'], }, { slug: ['c', '3'] }];
}

export default function BolgUsersPage({ params }: { params: { slug: string[] } }) {
    const { slug: [type, id] } = params;
    return (
        <div>blog-slug-type:{type}-type:{id}</div>
    );
}