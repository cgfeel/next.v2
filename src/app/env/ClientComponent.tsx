'use client'

import { FC } from "react"

// 不能在客户端调用服务端的环境变量，否则会报错，除非使用`NEXT_PUBLIC_`
const ClientComponent: FC = () => (
    <ul>
        <li>
            ENV_VARIABLE: {/*process.env.ENV_VARIABLE*/}
        </li>
        <li>
            NEXT_PUBLIC_ENV_VARIABLE: {process.env.NEXT_PUBLIC_ENV_VARIABLE}
        </li>
    </ul>
);

export default ClientComponent;