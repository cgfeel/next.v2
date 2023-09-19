import { revalidatePath } from "next/cache";
import { PropsWithChildren } from "react";
import Nav from "@/src/components/nav";
import styles from "./styles.module.css";
import Refresh from "./Refresh";

export default function Layout({ children }: PropsWithChildren<{}>) {
    async function flush() {
        'use server'
        revalidatePath('/fetch/server-action/post');
    }
    return (
        <div
            className={styles.flush}
        >
            <div 
                id="ptr-instructions"
            >
                <span className="ptr-instructions-text"></span>
            </div>
            <div 
                id="post-main"
            >
                <Nav 
                    activeClassName={styles.active}
                    className={styles.navLink}
                    matchAll={true}
                    items={[
                        { name: 'default', href: '/fetch/server-action/post' },
                        { name: 'android', href: '/fetch/server-action/post/2' },
                        { name: 'node', href: '/fetch/server-action/post/3' },
                    ]}
                />
                <hr />
                <Refresh handleRefresh={flush}>
                    {children}
                </Refresh>
            </div>
        </div>
    );
}