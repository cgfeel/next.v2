'use client';

import LinkRaw from "next/link";
import { FC, PropsWithChildren, forwardRef, useContext } from "react";
import { ProxyContext } from "./index";

const Link: LinkType = forwardRef(({ children, onClick, ...props }, ref) => {
    const [tips] = useContext(ProxyContext);
    const trigger = onClick||((e) => {
        const confirm = tips === undefined ? true : window.confirm(tips);
        if (!confirm) {
            e.preventDefault();
        }
    });
    return (
        <LinkRaw 
            {...props}
            ref={ref}
            onClick={trigger}
        >
            {children}
        </LinkRaw>
    );
});

if (process.env.NODE_ENV !== 'production') {
    Link.displayName = 'NavigationLink';
}

type LinkType = typeof LinkRaw;

export interface LinkProps {
    href: string;
}

export default Link;