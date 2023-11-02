'use client'

import Script from "next/script";
import { FC } from "react";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

const Csp: FC<{ nonce: string }> = ({ nonce }) => (
    <Script
        src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"
        data-test="script"
        id="example-script"
        onReady={() => console.log('aaa')}
    />
);

export default Csp;