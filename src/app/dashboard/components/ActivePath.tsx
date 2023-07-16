'use client'

import { usePathname } from "next/navigation";
import { FC } from "react"

const ActivePath: FC = () => {
    const pathname = usePathname();
    return (
        <>{pathname}</>
    );
};

export default ActivePath;