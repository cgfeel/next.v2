import { formatDiscount, productCurrencySymbol } from "@/lib/dineroUtils";
import { Dinero, toUnits } from "dinero.js";
import { FC } from "react";
import { Product } from "../product";
import ProductDeal from "./ProductDeal";
import ProductLinghteningDeal from "./ProductLihteningDeal";

const ProductPrice: FC<ProductPriceProps> = ({ discount: discountRaw, price }) => {
    const discount = formatDiscount(price, discountRaw);
    if (discount) {
        const { expirts } = discount;
        return [
            typeof expirts === 'number' && (
                <ProductLinghteningDeal
                    key="linghtening"
                    discount={discount}
                    price={price}
                />
            ),
            <ProductDeal 
                key="discount"
                discount={discount} 
                price={price} 
            />
        ];
    }

    return (
        <div
            className="flex"
        >
            <div 
                className="text-sm leading-snug text-white"
            >
                {productCurrencySymbol(price)}
            </div>
            <div 
                className="text-lg font-bold leading-snug text-white"
            >
                {toUnits(price)}
            </div>
        </div>
    );
};

export interface ProductPriceProps extends Pick<Product, 'discount'> {
    price: Dinero<number>;
};

export default ProductPrice;