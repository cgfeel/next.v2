import { PropsWithChildren } from "react";
import ActiveSegment from "../components/ActiveSegment";
import Breadcrumbs from "../components/Breadcrumbs";
import NavLink from "../components/NavLink";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>
                <NavLink
                    href="/func/client/shop/1/2"
                    slug="1"
                >
                    index
                </NavLink>
                {' | '}
                <NavLink
                    href="/func/client/shop/card"
                    slug="card"
                >
                    card
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