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
                    { name: 'default', href: '/file/dynamic/revalidate' },
                    { name: 'default-forc-cache', href: '/file/dynamic/revalidate-default-force-cache' },
                    { name: 'default-no-store', href: '/file/dynamic/revalidate-default-no-store' },
                    { name: 'zero', href: '/file/dynamic/revalidate-zero' },
                    { name: 'zero-fetch', href: '/file/dynamic/revalidate-zero-fetch' },
                    { name: 'zero-force-cache', href: '/file/dynamic/revalidate-zero-force-cache' },
                    { name: 'number', href: '/file/dynamic/revalidate-number' },
                ]}
                matchAll={true}
            />
            <hr />
            {children}
        </div>
    );
}