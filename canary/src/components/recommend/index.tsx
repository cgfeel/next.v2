import { delayRecommendedProducts } from "@/lib/constants";
import { headers } from "next/headers";
import { FC } from "react";
import ProductCard from "../product/card";
import { Product } from "../product/product";

async function RecommendedProducts() {
    // headers();
    const products: Product[] = await fetch(
        // We intentionally delay the response to simulate a slow data
        // request that would benefit from streaming
        `${process.env.HOME_URL}/api/products?delay=${delayRecommendedProducts}&filter=1`,
        {
            // We intentionally disable Next.js Cache to better demo
            // streaming
            cache: 'no-store'
        }
    ).then(res => res.json());

    return (
        <div
            className="space-y-6"
            data-header={headers()}
        >
            <div>
                <div 
                    className="text-lg font-medium text-white"
                >
                    Recommended Products for You
                </div>
                <div 
                    className="text-sm text-gray-400"
                >
                    Based on your preferences and shopping habits
                </div>
            </div>
            <div 
                className="grid grid-cols-4 gap-6"
            >
                {products.map(product => (
                    <div
                        className="col-span-2 md:col-span-1"
                        key={product.id}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;