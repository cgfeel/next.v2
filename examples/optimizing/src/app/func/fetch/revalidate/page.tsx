import { revalidatedData } from "../server";
import styles from "../../styles.module.css";

export default async function Page() {
    const indefinitely = await revalidatedData('infinity');

    const zero = await revalidatedData('zero', 0);

    // This request should be cached with a lifetime of 10 seconds.
    // Similar to `getStaticProps` with the `revalidate` option.
    const number = await revalidatedData('number', 10);

    return (
        <div
            className={styles.list}
        >
            <div>
                <strong>indefinitely:</strong>
            </div>
            <div>
                <p>
                    <code>false</code> - Cache the resource indefinitely. Semantically equivalent to <code>revalidate: Infinity</code>. The HTTP cache may evict older resources over time.
                </p>
            </div>
            <pre>{JSON.stringify(indefinitely, null, 4)}</pre>
            <hr />
            <div>
                <strong>zero:</strong>
            </div>
            <div>
                <p>
                    <code>0</code> - Prevent the resource from being cached.
                </p>
            </div>
            <pre>{JSON.stringify(zero, null, 4)}</pre>
            <hr />
            <div>
                <strong>number:</strong>
            </div>
            <div>
                <p>
                    <code>number</code> - {'(in seconds)'} Specify the resource should have a cache lifetime of at most <code>n</code> seconds.
                </p>
                <ul>
                    <li>
                        If an individual <code>{'fetch()'}</code> request sets a <code>revalidate</code> number lower than the default revalidate of a route, the whole route revalidation interval will be decreased.
                    </li>
                    <li>
                        If two fetch requests with the same URL in the same route have different <code>revalidate</code> values, the lower value will be used.
                    </li>
                    <li>
                        As a convenience, it is not necessary to set the <code>cache</code> option if <code>revalidate</code> is set to a number since <code>0</code> implies <code>cache: &#039;no-store&#039;</code> and a positive value implies <code>cache: &#039;force-cache&#039;</code>.
                    </li>
                    <li>
                        Conflicting options such as <code>{"{ revalidate: 0, cache: 'force-cache' }"}</code> or <code>{"{ revalidate: 10, cache: 'no-store' }"}</code> will cause an error.
                    </li>
                </ul>
            </div>
            <pre>{JSON.stringify(zero, null, 4)}</pre>
            <hr />
        </div>
    );
}