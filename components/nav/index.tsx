import { LinkProps } from "next/link";
import { FC } from "react";
import ActiveLink, { ActiveLinkProps } from "./ActiveLink";

type ItemType = LinkProps & {
    name: string;
};

interface NavProps extends Pick<ActiveLinkProps, 'activeClassName'|'className'|'matchAll'> {
    items: ItemType[];
}

const Nav: FC<NavProps> = ({ activeClassName, items, className = '', matchAll = false }) => (
    <nav>
        <ul>
            {items.map(({ name, ...props }, i) => (
                <li
                    key={`${name}:${i}`}
                >
                    <ActiveLink
                        {...props}
                        activeClassName={activeClassName}
                        className={className}
                        matchAll={matchAll}
                    >
                        {name}
                    </ActiveLink>
                </li>
            ))}
        </ul>
    </nav>
);

export default Nav;