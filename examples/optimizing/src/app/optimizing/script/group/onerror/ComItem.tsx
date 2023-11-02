'use client'

import Script from "next/script";
import { FC } from "react";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

const ComItem: FC<{ nonce: string }> = ({ nonce }) => (
    <Script
        src="https://example.com/script.js"
        onError={(e: Error) => {
            console.log('Script failed to load', e);
        }}
    />
);

export default ComItem;