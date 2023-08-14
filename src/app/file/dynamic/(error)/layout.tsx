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
                    { name: 'error', href: '/file/dynamic/error' },
                    { name: 'fetch', href: '/file/dynamic/error-fetch' },
                    { name: 'fetch-cache', href: '/file/dynamic/error-fetch-cache' },
                    { name: '[slug]', href: '[slug]', as: '/file/dynamic/error/1' },
                ]}
                matchAll={true}
            />
            <hr />
            {children}
        </div>
    );
}