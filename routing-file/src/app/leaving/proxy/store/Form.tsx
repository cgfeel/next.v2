'use client';

import { FC, PropsWithChildren, useContext } from "react";
import { ProxyContext } from "../../components/ProxyProvider";

const Form: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [, set] = useContext(ProxyContext);
    return (
        <form
            onChange={e => {
                e.preventDefault();
                
                const name = (e.currentTarget.elements[0] as HTMLInputElement).value;
                set(name === '' ? undefined : '');
            }}
        >
            {children}
        </form>
    );
};

export default Form;