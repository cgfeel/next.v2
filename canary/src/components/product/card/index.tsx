import { DineroSnapshot, dinero } from "dinero.js";
import { FC } from "react";
import { Product } from "../product";
import CardHeader from "./CardHeader";
import ProductEstimatedArrival from "../pricing/ProductEstimatedArrival";
import ProductLowStockWarning from "../pricing/ProductLowStockWarning";
import ProductRating from "../ProductRating";
import ProductPrice from "../pricing/ProductPrice";
import ProductUsedPrice from "../pricing/ProductUsedPrice";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const price = dinero(product.price as DineroSnapshot<number>);
    const { leadTime, name, rating, stock, usedPrice } = product;
    return (
        <div
            className="group block"
        >
            <div 
                className="space-y-2"
            >
                <CardHeader product={product} />
                <div 
                    className="truncate text-sm font-medium text-white group-hover:text-vercel-cyan"
                >
                    {name}
                </div>
                {rating && <ProductRating rating={rating} />}
                <ProductPrice
                    discount={product.discount}
                    price={price}
                />
                {usedPrice && <ProductUsedPrice usedPrice={usedPrice} />}
                <ProductEstimatedArrival leadTime={leadTime} />
                {stock <= 1 && <ProductLowStockWarning stock={stock} />}
            </div>
        </div>
    );
};

export interface ProductCardProps {
    product: Product;
}

export default ProductCard;