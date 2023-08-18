'use client'

import { FC, useEffect } from "react";
import { MethodType, getNum } from "./server";

interface ClientProps {
    loaded: () => Promise<boolean>;
}

const Client: FC<ClientProps> = ({ loaded }) => {
    useEffect(() => {
        const action = async (reset: number|MethodType) => await getNum(reset);
        action(init => init > 0 ? init : 1).then(num => num === 1 && loaded());
        return () => {
            action(init => init === 1 ? 2 : 0);
        };
    }, [getNum, loaded]);

    return (
        <div>It is client components, it is will be refresh fetch when this components is renderd.</div>
    );
};

export default Client;