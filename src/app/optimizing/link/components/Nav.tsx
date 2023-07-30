'use client'

import { FC } from "react";
import ActiveLink from "./ActiveLink";

const Nav: FC = () => (
    <nav>
        <style jsx>{`
            .nav :global(.nav-link) {
                text-decoration: none;
            }
            .nav :global(.active:after) {
                content: ' (current page)';
            }
        `}</style>
        <ul
            className="nav"
        >
            <li>
                <ActiveLink
                    activeClassName="active"
                    className="nav-link"
                    href="/optimizing/link/demo"
                >
                    Home
                </ActiveLink>
            </li>
            <li>
                <ActiveLink
                    activeClassName="active"
                    className="nav-link"
                    href="/optimizing/link/demo/about"
                >
                    About
                </ActiveLink>
            </li>
            <li>
                <ActiveLink
                    activeClassName="active"
                    className="nav-link"
                    href="/optimizing/link/demo/news"
                >
                    News
                </ActiveLink>
            </li>
            <li>
                <ActiveLink
                    activeClassName="active"
                    className="nav-link"
                    href="[slug]"
                    as="/optimizing/link/demo/dynamic-route"
                >
                    Dynamic Route
                </ActiveLink>
            </li>
        </ul>
    </nav>
);

export default Nav;