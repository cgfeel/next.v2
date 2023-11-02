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
                    { name: 'auto', href: '/file/dynamic/fetch-cache' },
                    { name: 'default-cache', href: '/file/dynamic/fetch-cache-default-cache' },
                    { name: 'only-cache', href: '/file/dynamic/fetch-cache-only-cache' },
                    { name: 'force-cache', href: '/file/dynamic/fetch-cache-force-cache' },
                    { name: 'default-no-store', href: '/file/dynamic/fetch-cache-default-no-store' },
                    { name: 'only-no-store', href: '/file/dynamic/fetch-cache-only-no-store' },
                    { name: 'force-no-store', href: '/file/dynamic/fetch-cache-force-no-store' },
                ]}
                matchAll={true}
            />
            <hr />
            {children}
        </div>
    );
}