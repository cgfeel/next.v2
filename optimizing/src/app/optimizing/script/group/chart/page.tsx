// import { headers } from "next/headers";
import Chart from "./Chart";
import Times from "./Times";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

export default function Page() {
    // const nonce = headers().get('x-nonce')||'';
    const nonce = '';
    return [
        <Times key="times" />,
        <Chart 
            key="chart"
            nonce={nonce} 
        />
    ];
}