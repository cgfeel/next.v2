import { dinero, DineroSnapshot } from "dinero.js";
import { FC, Suspense } from "react";
import { Product } from "../product";
import AddToCart from "./AddToCart";
import AddToCartFromCookies from "./AddToCartFromCookies";
import LoadingDots from "./LoadingDots";
import Ping from "./Ping";
import ProductPrice from "./ProductPrice";
import { UserSpecificDetails } from "./UserSpecificDetails";

const Pricing: FC<{ product: Product }> = ({ 
    product: { 
        discount, id, price: priceRaw, stock 
    } 
}) => {
    const price = dinero(priceRaw as DineroSnapshot<number>);
    return (
        <div 
            className="space-y-4 rounded-lg bg-gray-900 p-3"
        >
            <ProductPrice 
                discount={discount}
                price={price}
            />
            <Ping />
            <Suspense
                fallback={<LoadingDots />}
            >
                <UserSpecificDetails productId={id} />
            </Suspense>
            <Suspense
                fallback={<AddToCart initialCartCount={0} />}
            >
                <AddToCartFromCookies />
            </Suspense>
        </div>
    );
};

export default Pricing;