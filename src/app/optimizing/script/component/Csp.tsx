'use client'

import Script from "next/script";
import { FC } from "react";

const Csp: FC = () => (
    <Script
        src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"
        nonce="XUENAJFW1"
        data-test="script"
        id="example-script"
        onReady={() => console.log('aaa')}
    />
);

export default Csp;