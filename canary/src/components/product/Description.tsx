import { FC } from "react";
import { Product } from "./product";
import ProductRating from "./ProductRating";

const Description: FC<DescriptionProps> = ({ product: { description, name, rating } }) => (
    <div
        className="col-span-full space-y-4 md:order-2 md:col-span-2"
    >
        <div
            className="truncate text-xl font-medium text-white lg:text-2xl"
        >
            {name}
        </div>
        <ProductRating rating={rating} />
        <div
            className="space-y-4 text-sm text-gray-200"
        >
            <p>{description}</p>
            <p>{description}</p>
        </div>
    </div>
);

export interface DescriptionProps {
    product: Product;
}

export default Description;