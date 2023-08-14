'use client'

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

export interface ActiveLinkProps extends LinkProps {
    activeClassName: string;
    className?: string;
    matchAll?: boolean;
}

const ActiveLink: FC<PropsWithChildren<ActiveLinkProps>> = ({ 
    activeClassName, children, className = '', matchAll = false, ...props
}) => {
    const [href, setHref] = useState('');
    const pathname = usePathname();

    const activePathname = href === '' ? '--active-wait' : new URL(pathname, href).pathname;
    const linkPathname = href === '' ? '--link-wait' : new URL(
        (props.as||props.href||'') as string, href
    ).pathname;

    const getClassName = useCallback(() => {
        return matchAll ? linkPathname === activePathname : activePathname.startsWith(linkPathname);
    }, [activePathname, linkPathname, matchAll]);

    useEffect(() => {
        setHref(location.href);
    }, [setHref]);

    return (
        <Link
            {...props}
            className={`${className} ${getClassName() ? activeClassName : ''}`.trim()}
        >
            {children}
        </Link>
    );
};

export default ActiveLink; 