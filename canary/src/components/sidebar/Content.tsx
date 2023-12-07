import { delayRecommendedProducts, delayReviews, delayShippingEstimate } from "@/lib/constants";
import { FC } from "react";
import Byline from "../Byline";

const Content: FC = () => [
    <div 
        className="prose prose-sm prose-invert max-w-none space-y-6 px-4 pb-20 text-gray-300"
        key="content"
    >
        <div 
            className="text-gray-400"
        >
            <p>
                <span 
                    className="font-bold text-vercel-pink"
                >
                    Pink dots
                </span>
                {' '}
                denote artificially delayed responses for demo purposes:
            </p>
            <ul>
                <li>Shipping estimate → {delayShippingEstimate}ms</li>
                <li>Recommended products → {delayRecommendedProducts}ms</li>
                <li>Reviews → {delayReviews}ms</li>
            </ul>
        </div>
        <p>
            <a
                target="_blank"
                href="https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model"
            >
                Partial Prerendering
            </a>
            {' '}
            combines ultra-quick static edge delivery with fully dynamic capabilities. This is different from how your application behaves today, where entire routes are either fully static or dynamic.
        </p>
        <p>How it works:</p>
        <ul>
            <li>
                A static route <em>shell</em> is served immediately, this makes the initial load fast.
            </li>
            <li>
                The shell leaves <em>holes</em> where dynamic content (that might be slower) will be streamed in to minimize the perceived overall page load time.
            </li>
            <li>
                The async holes are loaded in parallel, reducing the overall load time of the page.
            </li>
        </ul>
        <p 
            className="text-gray-400"
        >
            Try refreshing the page to restart the demo.
        </p>
    </div>,
    <Byline 
        className="absolute hidden sm:block"
        key="footer"
    />
];

export default Content;