'use client'

import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { FC } from "react"

const ActivePath: FC = () => {
    const pathname = usePathname();
    const perSegment = useSelectedLayoutSegment('performance');
    return (
        <div>{pathname} @ {perSegment}</div>
    );
};

export default ActivePath;