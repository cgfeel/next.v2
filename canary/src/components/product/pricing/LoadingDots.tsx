import { FC } from "react";

const LoadingDots: FC = () => (
    <div 
        className="text-sm"
    >
        <span 
            className="space-x-0.5"
        >
            <span 
                className="inline-flex animate-[loading_1.4s_ease-in-out_infinite] rounded-full"
            >
                &bull;
            </span>
            <span 
                className="inline-flex animate-[loading_1.4s_ease-in-out_0.2s_infinite] rounded-full"
            >
                &bull;
            </span>
            <span 
                className="inline-flex animate-[loading_1.4s_ease-in-out_0.4s_infinite] rounded-full"
            >
                &bull;
            </span>
        </span>
    </div>
);

export default LoadingDots;