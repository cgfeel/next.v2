import { DineroSnapshot, dinero } from "dinero.js";
import { FC } from "react";
import { Product } from "../product";

const ProductUsedPrice: FC<UsedPriceProps> = ({ usedPrice: usedPriceRaw }) => {
    const usePrice = dinero(usedPriceRaw as DineroSnapshot<number>);
    return (
        <div
            className="text-sm"
        >
            <div className="text-gray-400">More buying choices</div>
            <div
                className="text-gray-200"
            >
                ${usePrice.toJSON().amount / 100} (used)
            </div>
        </div>
    );
};

export interface UsedPriceProps extends Pick<Required<Product>, 'usedPrice'> {}

export default ProductUsedPrice;