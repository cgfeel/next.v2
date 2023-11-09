'use client';

import { useSearchParams } from "next/navigation";
import { FC } from "react";

const SearchParams: FC = () => {
    const params = useSearchParams();
    return (
        <span>{params.toString()}</span>
    );
};

export default SearchParams;