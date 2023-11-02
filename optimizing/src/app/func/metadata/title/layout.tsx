import { Metadata } from "next";
import { PropsWithChildren } from "react";
import styles from "../../styles.module.css";

export const metadata: Metadata = {
    description: 'The React Framework for the Web',
    title: {
        template: '%s | Acme',
        default: 'Acme',
    },
};

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div
            className={styles.list}
        >
            <div>{children}</div>
            <hr />
            <ul>
                <li>
                    <code>layout.js</code>
                    <ul>
                        <li>
                            <code>title</code> {'(string)'} and <code>title.default</code> define the default title for child segments {'(that do not define their own '}<code>title</code>{')'}. It will augment <code>title.template</code> from the closest parent segment if it exists.
                        </li>
                        <li>
                            <code>title.absolute</code> defines the default title for child segments. It ignores <code>title.template</code> from parent segments.
                        </li>
                        <li>
                            <code>title.template</code> defines a new title template for child segments.
                        </li>
                    </ul>
                </li>
                <li>
                    <code>page.js</code>
                    <ul>
                        <li>
                            If a page does not define its own title the closest parents resolved title will be used.
                        </li>
                        <li>
                            <code>title</code> {'(string)'} defines the routes title. It will augment <code>title.template</code> from the closest parent segment if it exists.
                        </li>
                        <li>
                            <code>title.absolute</code> defines the route title. It ignores <code>title.template</code> from parent segments.
                        </li>
                        <li>
                            <code>title.template</code> has no effect in <code>page.js</code> because a page is always the terminating segment of a route.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}