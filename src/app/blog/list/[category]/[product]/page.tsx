export async function generateStaticParams() {
    return [
        { category: 'a', product: '1' },
        { category: 'b', product: '2' },
        { category: 'c', product: '3' },
    ];
}

export default function BolgCategoryProduct({ params }: {
    params: { category: string; product: string }
}) {
    const { category, product } = params;
    return (
        <div>Bolg-category:{category}-product:{product}</div>
    );
}