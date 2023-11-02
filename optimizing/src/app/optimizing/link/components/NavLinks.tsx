'use client'

import Nav from "@/src/components/nav";
import { FC } from "react"

const NavLinks: FC = () => (
    <div
        className="nav"
    >
        <style jsx>{`
            .nav :global(.nav-link) {
                text-decoration: none;
            }
            .nav :global(.active:after) {
                content: ' (current page)';
            }
        `}</style>
        <Nav
            activeClassName="active"
            className="nav-link"
            matchAll={true}
            items={[
                { href: '/optimizing/link/demo', name: 'Home' },
                { href: '/optimizing/link/demo/about', name: 'About' },
                { href: '/optimizing/link/demo/news', name: 'News' },
                { as: '/optimizing/link/demo/dynamic-route', href: '[slug]', name: 'Dynamic Route' },
            ]}
        />
    </div>
);

export default NavLinks;