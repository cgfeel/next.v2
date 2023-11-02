'use Client'

// import { headers } from "next/headers";
import Csp from "../component/Csp";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

export default function Page() {
    // const nonce = headers().get('x-nonce')||'';
    const nonce = '';

    return (
        <div>
            tst1
            <Csp nonce={nonce} />
        </div>
    );
}