import { FC } from "react";

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function ProductSkeleton() {
    return (
        <div
            className="col-span-4 space-y-4 lg:col-span-1"
        >
            <div className={`relative h-[167px] rounded-xl bg-gray-900 ${shimmer}`} />
            <div className="h-4 w-full rounded-lg bg-gray-900" />
            <div className="h-6 w-1/3 rounded-lg bg-gray-900" />
            <div className="h-4 w-full rounded-lg bg-gray-900" />
            <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
        </div>
    );
}

const Skeleton: FC = () => (
    <div
        className="space-y-6 pb-[5px]"
    >
        <div 
            className="space-y-2"
        >
            <div className={`h-6 w-1/3 rounded-lg bg-gray-900 ${shimmer}`} />
            <div className={`h-4 w-1/2 rounded-lg bg-gray-900 ${shimmer}`} />
        </div>
        <div 
            className="grid grid-cols-4 gap-6"
        >
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
        </div>
    </div>
);

export { shimmer };

export default Skeleton;