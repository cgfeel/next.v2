export default function Page({ params }: { params: { slug?: string[] } }) {
    const { slug = [] } = params;
    return (
        <div>shop - slugs：{slug.length ? slug.join('|') : 'is none'}</div>
    );
}