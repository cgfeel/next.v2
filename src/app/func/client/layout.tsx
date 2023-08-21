import { PropsWithChildren, Suspense } from "react";
import { NavigationEvent } from "../../posts/components/NavigationEvent";
import styles from "../styles.module.css";
import ActiveSegment from "./components/ActiveSegment";
import Breadcrumbs from "./components/Breadcrumbs";
import NavLink from "./components/NavLink";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div
            className={styles.list}
        >
            <div>
                <NavLink
                    href="/func/client"
                    slug={null}
                >
                    index
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/1"
                    slug="1"
                >
                    slug
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/shop/1/2"
                    slug="shop"
                >
                    shop
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/blog/1/2"
                    slug="blog"
                >
                    blog
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/router"
                    slug="router"
                >
                    router
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/search-params?a=1&a=2&b"
                    slug="search-params"
                >
                    search
                </NavLink>
            </div>
            <hr />
            <div>
                <Breadcrumbs />
            </div>
            <hr />
            <div>
                <ActiveSegment />
            </div>
            <hr />
            {children}
            <Suspense fallback={null}>
                <NavigationEvent />
            </Suspense>
        </div>
    );
}