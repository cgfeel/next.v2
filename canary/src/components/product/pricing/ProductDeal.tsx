import { productCurrencySymbol } from "@/lib/dineroUtils";
import { Dinero, toUnits } from "dinero.js";
import { FC } from "react";

const ProductDeal: FC<ProductDealProps> = ({ discount: discountRaw, price: priceRaw }) => {
    const discount = toUnits(discountRaw.amount);
    const price = toUnits(priceRaw);
    const percent = Math.round(100 - (Number(discount.join('.')) / Number(price.join('.'))) * 100);

    return (
        <div
            className="flex gap-x-1.5"
        >
            <div 
                className="text-lg font-bold leading-snug text-vercel-cyan"
            >
                -{percent}%
            </div>
            <div 
                className="flex"
            >
                <div 
                    className="text-sm leading-snug text-white"
                >
                    {productCurrencySymbol(discountRaw.amount)}
                </div>
                <div 
                    className="text-lg font-bold leading-snug text-white"
                >
                    {parseFloat(discount.join('.'))}
                </div>
            </div>
            <div
                className="text-sm leading-snug text-gray-400 line-through"
            >
                {productCurrencySymbol(priceRaw)}{parseFloat(price.join('.'))}
            </div>
        </div>
    );
};

export interface ProductDealProps {
    discount: {
        amount: Dinero<number>;
        expirts?: number;
    };
    price: Dinero<number>;
}

export default ProductDeal;