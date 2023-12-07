import { productCurrencySymbol } from "@/lib/dineroUtils";
import { Dinero, allocate, toUnits, up } from "dinero.js";
import { FC } from "react";

const ProductSplitPayments: FC<PaymentsProps> = ({ price }) => {
    // only offer split payments for more expensive items
    if (toUnits(price)[0] < 150) return null;

    const [perMonth] = allocate(price, [1, 2]);
    return (
        <div
            className="text-sm text-gray-400"
        >
            Or {productCurrencySymbol(price)}
            {perMonth.toJSON().amount / 100}/month for 3 months
        </div>
    );
};

export interface PaymentsProps {
    price: Dinero<number>;
}

export default ProductSplitPayments;