'use client'

import { useSelectedLayoutSegment } from "next/navigation";
import { FC } from "react"

const ActiveSegment: FC = () => {
    const segment = useSelectedLayoutSegment();
    return (
        <>Active segment: {segment}</>
    );
};

export default ActiveSegment;