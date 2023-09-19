'use client'

import { usePathname, useRouter } from 'next/navigation';
import PullToRefresh from 'pulltorefreshjs';
import { FC, PropsWithChildren, useEffect, useTransition } from "react";

const Refresh: FC<PropsWithChildren<{ handleRefresh: () => void }>> = ({ children, handleRefresh }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        const refresh = PullToRefresh.init({
            ptrElement: '#ptr-instructions', // 'pull to refresh' intructions element
            ptrTextElement: '.ptr-instructions-text', // intructions' text element
            targetElement: '#post-main', // target element that will be dragged and refreshed
            
            // optional
            instructionsPullToRefresh: 'pull to refresh', // text
            instructionsReleaseToRefresh: 'Release to refresh', //text
            instructionsRefreshing: 'refreshing', // text
            threshold: 60, // minimum distance required to trigger the onPull callback
            onRefresh() {
                startTransition(() => {
                    handleRefresh();
                });
            }
        });
        return () => {
            refresh.destroy();
        };
    }, [pathname, handleRefresh]);

    return (
        <div>{isPending ? 'loading...' : children}</div>
    );
};

export default Refresh;