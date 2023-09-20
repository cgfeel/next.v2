'use client'

import { usePathname } from "next/navigation";
import { FC } from "react"

const FindPath: FC = () => {
    const pathname = usePathname();
    return (
        <span>{pathname}</span>
    );
};

export default FindPath;