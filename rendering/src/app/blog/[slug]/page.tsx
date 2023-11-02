export async function generateStaticParams() {
    return [{ slug: '1' }, { slug: '2' }];
}

export default function BolgPage({ params }: { params: { slug: `${number}` } }) {
    const { slug } = params;
    return (
        <div>blog页面展示{slug}</div>
    );
}