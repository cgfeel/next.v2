import SingleProduct from "@/components/product";
import Ping from "@/components/product/pricing/Ping";
import RecommendedProducts from "@/components/recommend";
import Skeleton from "@/components/recommend/Skeleton";
import Reviews from "@/components/reviews";
import ReviewSkeleton from "@/components/reviews/Skeleton";
import { Suspense } from "react";

export default function Page() {
    return (
        <div
            className="space-y-8 lg:space-y-14"
        >
            <SingleProduct />
            <Ping />
            <Suspense
                fallback={<Skeleton />}
            >
                <RecommendedProducts />
            </Suspense>
            <Ping />
            <Suspense
                fallback={<ReviewSkeleton />}
            >
                <Reviews />
            </Suspense>
        </div>
    );
}