'use client';

import { FC, PropsWithChildren, useContext, useEffect, useRef } from "react";
import { NavigationContext } from "../../components/NavigationProvider";

const Form: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { open } = useContext(NavigationContext);
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const data = localStorage.getItem('name')||'';
        if (data !== '') {
            const input = ref.current?.elements[0] as HTMLInputElement;
            input.value = data;
        }
    }, [ref]);

    return (
        <form
            ref={ref}
            onChange={e => {
                e.preventDefault();
                const name = (e.currentTarget.elements[0] as HTMLInputElement).value;

                localStorage.setItem('name', name);
                open(name === '' ? '' : 'name');
            }}
        >
            {children}
        </form>
    );
};

export default Form;