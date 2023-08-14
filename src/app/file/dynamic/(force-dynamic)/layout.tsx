import Nav from "@/src/components/nav";
import { PropsWithChildren } from "react";
import styles from "../../styles.module.css";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <Nav
                activeClassName={styles.active}
                className={styles.navLink}
                items={[
                    { name: 'force-dynamic', href: '/file/dynamic/force-dynamic' },
                    { name: 'fetch', href: '/file/dynamic/force-dynamic-fetch' },
                    { name: 'fetch-revalidate', href: '/file/dynamic/force-dynamic-revalidate' },
                    { name: 'fetch-cache', href: '/file/dynamic/force-dynamic-fetch-cache' },
                ]}
                matchAll={true}
            />
            <hr />
            {children}
        </div>
    );
}