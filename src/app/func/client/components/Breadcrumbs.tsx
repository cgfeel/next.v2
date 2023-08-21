'use client'

import { useSelectedLayoutSegments } from "next/navigation";
import { FC } from "react"

const Breadcrumbs: FC = () => {
    const segments = useSelectedLayoutSegments();
    return (
        <>breadcrumbs: {JSON.stringify(segments)}</>
    );
};

export default Breadcrumbs;