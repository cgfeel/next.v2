import { StarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FC } from "react";

const ProductRating: FC<ProductRatingProps> = ({ rating }) => (
    <div
        className="flex gap-x-1"
    >
        {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
                key={i}
                className={clsx('w-4', i < rating ? 'text-white' : 'text-gray-500')}
            />
        ))}
    </div>
);

export interface ProductRatingProps {
    rating: number;
};

export default ProductRating;