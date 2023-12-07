import { delayReviews } from "@/lib/constants";
import { headers } from "next/headers";
import { FC } from "react";
import { ReviewType } from "../product/product";
import ProductReviewCard from "../product/ProductReviewCard";

async function Reviews() {
    const reviews: ReviewType[] = await fetch(
        // We intentionally delay the response to simulate a slow data
        // request that would benefit from streaming
        `${process.env.HOME_URL}/api/reviews?delay=${delayReviews}`,
        {
            // We intentionally disable Next.js Cache to better demo
            // streaming
            cache: 'no-store'
        }
    ).then(res => res.json());

    return (
        <div 
            className="space-y-6" 
            data-headers={headers()}
        >
            <div className="text-lg font-medium text-white">Customer Reviews</div>
            <div
                className="space-y-8"
            >
                {reviews.map(review => (
                    <ProductReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default Reviews;