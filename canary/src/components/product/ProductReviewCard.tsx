import { FC } from "react";
import { ReviewType } from "./product";
import ProductRating from "./ProductRating";

const ProductReviewCard: FC<ReviewCardProps> = ({ review: { name, rating, text } }) => (
    <div
        className="space-y-4"
    >
        <div 
            className="space-y-2"
        >
            <div 
                className="flex items-center gap-x-2"
            >
                <div className="h-6 w-6 rounded-full bg-gray-700" />
                <div className="text-sm text-white">{name}</div>
            </div>
            {rating && <ProductRating rating={rating} />}
        </div>
        <div className="text-gray-400">{text}</div>
    </div>
);

export interface ReviewCardProps {
    review: ReviewType;
}

export default ProductReviewCard;