import { PropsWithChildren } from "react";
import ActiveSegment from "../components/ActiveSegment";
import Breadcrumbs from "../components/Breadcrumbs";
import NavLink from "../components/NavLink";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>
                <NavLink
                    href="/func/client/search-params?a=1&a=2&b"
                    slug={null}
                >
                    static
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/search-params/dynamic?a=1&a=2&b"
                    slug="dynamic"
                >
                    dynamic
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/search-params/server?a=1&a=2&b"
                    slug="server"
                >
                    server
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/search-params/update?a=1&a=2&b"
                    slug="update"
                >
                    update
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
        </div>
    );
}