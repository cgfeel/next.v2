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
                    { name: 'dynmicParams-true', href: '[slug]', as: '/file/dynamic/in-dynmic-params/1' },
                    { name: 'dynmicParams-false (404)', href: '[slug]', as: '/file/dynamic/not-in-dynmic-params/10' },
                ]}
                matchAll={true}
            />
            <hr />
            {children}
        </div>
    );
}