import Nav from "@/src/components/nav";
import { PropsWithChildren } from "react";
import styles from "../styles.module.css";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <Nav 
                activeClassName={styles.active}
                className={styles.navLink}
                items={[
                    { name: 'auto', href: '/file/dynamic/auto' },
                    { name: 'force-dynamic', href: '/file/dynamic/force-dynamic' },
                    { name: 'error', href: '/file/dynamic/error' },
                    { name: 'force-static', href: '/file/dynamic/force-static' },
                    { name: 'dynmicParams', href: '[slug]', as: '/file/dynamic/in-dynmic-params/1' },
                    { name: 'revalidate', href: '/file/dynamic/revalidate' },
                    { name: 'fetchCache', href: '/file/dynamic/fetch-cache' },
                ]}
            />
            <hr />
            {children}
        </div>
    );
}