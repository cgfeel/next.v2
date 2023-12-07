import { FC } from "react";
import { shimmer } from "../recommend/Skeleton";

const ReviewsSkeleton: FC = () => (
    <div 
        className="space-y-4"
    >
      <div className="h-6 w-2/6 rounded-lg bg-gray-900" />
      <div className="h-4 w-1/6 rounded-lg bg-gray-900" />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
    </div>
);

const Skeleton: FC = () => (
    <div
        className="space-y-6"
    >
        <div className={`h-7 w-2/5 rounded-lg bg-gray-900 ${shimmer}`} />
        <div 
            className="space-y-8"
        >
            <ReviewsSkeleton />
            <ReviewsSkeleton />
        </div>
    </div>
);

export default Skeleton;