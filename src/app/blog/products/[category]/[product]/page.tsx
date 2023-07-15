export async function generateStaticParams({
    params: { category },
}: {
    params: { category: string }
}) {
    console.log(category);
    return [{ product: '1' }, { product: '2' }, { product: '3' }];
}

export default function page({ params }: { 
    params: { category: string, product: `${number}` } 
}) {
    const { category, product } = params;
    return (
        <div>blog-page-category:{category}-product{product}</div>
    );
}