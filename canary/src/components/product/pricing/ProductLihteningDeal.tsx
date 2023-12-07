import { add, formatDistanceToNow } from "date-fns";
import { FC } from "react";
import { ProductDealProps } from "./ProductDeal";

const ProductLinghteningDeal: FC<ProductLinghteningProps> = ({ discount, price }) => {
    const date = add(new Date(), { days: discount.expirts });
    return (
        <div 
            className="flex"
        >
            <div 
                className="rounded bg-gray-600 px-1.5 text-xs font-medium leading-5 text-white"
            >
                Expires in {formatDistanceToNow(date)}
            </div>
        </div>
    );
};

export interface ProductLinghteningProps extends ProductDealProps {};

export default ProductLinghteningDeal;