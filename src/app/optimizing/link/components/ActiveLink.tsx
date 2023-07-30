'use client'

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren, useEffect, useState } from "react";

type ActiveLinkProps = LinkProps & {
    activeClassName: string;
    className?: string;
};

const ActiveLink: FC<PropsWithChildren<ActiveLinkProps>> = ({ activeClassName, children, className = '', ...props }) => {
    const [href, setHref] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        setHref(location.href);
    }, [setHref]);

    const activePathname = href === '' ? '--active-wait' :  new URL(pathname, href).pathname;
    const linkPathname = href === '' ? '--link-wait' : new URL(
        (props.as||props.href||'') as string, href
    ).pathname;

    return (
        <Link 
            className={`${className} ${linkPathname === activePathname ? activeClassName : ''}`.trim()}
            {...props}
        >
            {children}
        </Link>
    );
};

export default ActiveLink;