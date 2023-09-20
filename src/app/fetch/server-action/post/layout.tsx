import Nav from "@/src/components/nav";
import { revalidatePath } from "next/cache";
import { PropsWithChildren } from "react";
import { flush } from "./action";
import ClientRouter from "./components/ClientRouter";
import ClientLink from "./components/ClientLink";
import Refresh from "./Refresh";
import styles from "./styles.module.css";

export default function Layout({ children }: PropsWithChildren<{}>) {
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
                        { name: 'java', href: '/fetch/server-action/post/4' },
                    ]}
                />
                <div>
                    <ClientRouter />
                </div>
                <div>
                    <ClientLink />
                </div>
                <hr />
                <Refresh handleRefresh={flush}>
                    {children}
                </Refresh>
            </div>
        </div>
    );
}