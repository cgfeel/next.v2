import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import ClientComponent from "./ClientComponent";
import styles from "./styles.module.css";

const Code: FC<PropsWithChildren<{}>> = ({ children }) => (
    <code
        className={styles.inlineCode}
    >
        {children}
    </code>
);

// `generateMetadata`, and similar Next.js methods like `generateStaticParams`
// only run in Node.js. Check the terminal to see the environment variables
export async function generateMetadata(
    { params }: { params: {} }, parent: ResolvingMetadata
): Promise<Metadata> {
    // Using the variables below in the browser will return `undefined`. Next.js doesn't
    // expose environment variables unless they start with `NEXT_PUBLIC_`
    console.log('[Node.js only] ENV_VARIABLE:', process.env.ENV_VARIABLE);
    console.log(
        '[Node.js only] ENV_LOCAL_VARIABLE:',
        process.env.ENV_LOCAL_VARIABLE
    );

    return {
        title: 'Environment Variables with Next.js',
        description: `In the table below you&#039;ll see how environment variables can be exposed to the browser with Next.js.`
    };
}

export default function Page() {
    return (
        <div
            className={styles.container}
        >
            <div
                className={styles.card}
            >
                <h1>Environment Variables with Next.js</h1>
                <hr className={styles.hr} />
                <p>
                    In the table below you&#039;ll see how{' '}
                    <Link
                        href="https://nextjs.org/docs/app/building-your-application/configuring/environment-variables"
                    >
                        environment variables can be exposed to the browser
                    </Link>{' '}
                    with Next.js.
                </p>
                <p>
                    In general only <Code>.env.local</Code> or <Code>.env</Code> are needed
                    for this, but the table also features the usage of{' '}
                    <Code>.env.development</Code> and <Code>.env.production</Code>.
                </p>
                <table
                    className={styles.table}
                >
                    <thead>
                        <tr>
                            <th>Variable Name</th>
                            <th>Value</th>
                            <th>Added By</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NEXT_PUBLIC_ENV_VARIABLE</td>
                            <td>{process.env.NEXT_PUBLIC_ENV_VARIABLE}</td>
                            <td>
                                <Code>.env</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>NEXT_PUBLIC_ENV_LOCAL_VARIABLE</td>
                            <td>{process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}</td>
                            <td>
                                <Code>.env.local</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE</td>
                            <td>{process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE}</td>
                            <td>
                                <Code>.env.development</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE</td>
                            <td>{process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE}</td>
                            <td>
                                <Code>.env.production</Code>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                <Code>.env.local</Code> is not added by the example, because it must be
                ignored by git, but you can add it manually:
                </p>
                <pre>
                    <code>cp .env.local.example .env.local</code>
                </pre>
                <p>
                    Variables in <Code>.env.production</Code> won&#039;t be available if the app
                    is running in development:
                </p>
                <pre>
                    <code>npm run dev</code>
                </pre>
                <p>
                    Similarly, variables in <Code>.env.development</Code> won&#039;t be available
                    if the app is running on production:
                </p>
                <pre>
                    <code>npm run build && npm run start</code>
                </pre>
                <p>
                    Once you run the app, you&#039;ll see logs like these in the terminal:
                </p>
                <pre>
                    <code>
                        info - Loaded env from /home/user/../.env.local{'\n'}
                        info - Loaded env from /home/user/../.env.development{'\n'}
                        info - Loaded env from /home/user/../.env{'\n'}
                    </code>
                </pre>
                <p>
                    The order is important, the first loaded env will have a higher
                    priority.
                </p>
                <p>
                    <Code>.env</Code> will not overwrite any variables defined in{' '}
                    <Code>.env.local</Code> or <Code>.env.development</Code>.
                </p>
                <hr className={styles.hr} />
                <div>
                    Environment variables in server component.
                    <ul>
                        <li>
                            ENV_VARIABLE: {process.env.ENV_VARIABLE}
                        </li>
                        <li>
                            NEXT_PUBLIC_ENV_VARIABLE: {process.env.NEXT_PUBLIC_ENV_VARIABLE}
                        </li>
                    </ul>
                </div>
                <hr className={styles.hr} />
                <div>
                    Environment variables in client browser.
                    <ClientComponent />
                </div>
                <hr className={styles.hr} />
                <div>
                    Environment variables overrides.
                    <ul>
                        <li>
                            OVERRIDES_VARIABLE: {process.env.OVERRIDES_VARIABLE}
                        </li>
                    </ul>
                </div>
                <hr className={styles.hr} />
                <div>
                    Environment variables in next.config.js.
                    <ul>
                        <li>
                            HOME_UR: {process.env.HOME_URL}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}