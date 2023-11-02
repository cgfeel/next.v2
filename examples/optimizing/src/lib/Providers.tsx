// import { headers } from "next/headers";
import { FC, PropsWithChildren } from "react";
import ProvidersClient from "./ProvidersClient";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
    // const nonce = headers().get('x-nonce')||'';
    const nonce = '';
    return (
        <ProvidersClient
            nonce={nonce}
        >
            {children}
        </ProvidersClient>
    );
};

export default Providers;