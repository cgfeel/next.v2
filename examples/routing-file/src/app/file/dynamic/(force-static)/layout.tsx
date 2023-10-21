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
                    { name: 'force-static', href: '/file/dynamic/force-static' }
                ]}
                matchAll={true}
            />
            <hr />
            {children}
        </div>
    );
}