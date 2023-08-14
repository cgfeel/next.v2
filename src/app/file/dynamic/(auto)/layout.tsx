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
                    { name: 'auto', href: '/file/dynamic/auto' },
                    { name: 'auto-preferred-region', href: '/file/dynamic/auto-preferred-region' },
                    { name: 'auto-max-duration', href: '/file/dynamic/auto-max-duration' },
                    /*{ name: 'auto-fetch', href: '/file/dynamic/auto-fetch' },
                    { name: 'auto-link', href: '/file/dynamic/auto-link' },*/
                ]}
                matchAll={true}
            />
            <hr />
            {children}
        </div>
    );
}