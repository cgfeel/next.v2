import { PropsWithChildren } from "react";

export async function generateStaticParams() {
    return [{ category: 'a' }, { category: 'b' }, { category: 'c' }];
}

export default function BolgProductsLayout({ children, params }: PropsWithChildren<{ params: { category: string } }>) {
    const { category } = params;
    return (
        <div>
            <p>blog-layout-category:{category}</p>
            {children}
        </div>
    );
}