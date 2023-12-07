import { delayShippingEstimate } from "@/lib/constants";
import { DineroSnapshot, dinero } from "dinero.js";
import { Product } from "../product";
import ProductEstimatedArrival from "./ProductEstimatedArrival";
import ProductLowStockWarning from "./ProductLowStockWarning";
import ProductSplitPayments from "./ProductSplitPayments";
import ProductUsedPrice from "./ProductUsedPrice";

export async function UserSpecificDetails({ productId }: { productId: string }) {
    const data = await fetch(`${process.env.HOME_URL}/api/products?id=${productId}&delay=${delayShippingEstimate}&filter=price,usedPrice,leadTime,stock`, {
        // We intentionally disable Next.js Cache to better demo streaming
        cache: 'no-store'
    });

    const product = (await data.json()) as Product;
    const price = dinero(product.price as DineroSnapshot<number>);

    return (
        <>
            <ProductSplitPayments price={price} />
            {product.usedPrice && (
                <ProductUsedPrice usedPrice={product.usedPrice} />
            )}
            <ProductEstimatedArrival 
                leadTime={product.leadTime}
                hasDeliveryTime 
            />
            {product.stock <= 1  && <ProductLowStockWarning stock={product.stock} />}
        </>
    );
}