'use client'

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { FC, PropsWithChildren } from "react";

interface NavLinkProps {
    href: string;
    slug: string|null;
}

const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({ children, href, slug }) => {
    // Navigating to `/blog/hello-world` will return 'hello-world'
    // for the selected layout segment
    const segment = useSelectedLayoutSegment();
    const isActive = slug === segment;

    return (
        <>
            <Link
                href={href}
                className={isActive ? 'active' : ''}
            >
                {children}
            </Link>
            <style jsx global>{`
                .active {
                    color: #fb0;
                }
            `}</style>
        </>
    );
};

export default NavLink;