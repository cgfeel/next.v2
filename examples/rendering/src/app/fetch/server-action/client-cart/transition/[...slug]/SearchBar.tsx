'use client'

import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounceFn } from "ahooks";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";

const SearchBar: FC<{ slug: string }> = ({ slug }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { run } = useDebounceFn(
        (page) => {
            startTransition(() => router.push(page));
        },
        {
            wait: 500,
        }
    );

    return (
        <label>
            {isPending ? <LoadingOutlined /> : <SearchOutlined />}
            <input defaultValue={slug} onChange={e => run(e.target.value)} />
        </label>
    );
};

export default SearchBar;