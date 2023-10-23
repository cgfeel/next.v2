export async function generateStaticParams({
    params: { category },
}: {
    params: { category: string }
}) {
    return [{ product: '1', category }, { product: '2', category }, { product: '3', category }];
}

export default function page({ params }: { 
    params: { category: string, product: `${number}` } 
}) {
    const { category, product } = params;
    return (
        <div>blog-page-category:{category}-product{product}</div>
    );
}