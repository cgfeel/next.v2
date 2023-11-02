import { fetchData } from "./server";
import styles from "../styles.module.css";

export default async function Page() {

    // This request should be cached until manually invalidated.
    // Similar to `getStaticProps`.
    // `force-cache` is the default and can be omitted.
    const forceCache = await fetchData('force-cache');

    // This request should be refetched on every request.
    // Similar to `getServerSideProps`.
    const noStore = await fetchData('no-store', 'no-store');

    return (
        <div
            className={styles.list}
        >
            <div>
                <strong>force-cache:</strong>
            </div>
            <div>
                <p>
                    <code>force-cache</code> {'(default)'} - Next.js looks for a matching request in its Data Cache.
                </p>
                <ul>
                    <li>
                        If there is a match and it is fresh, it will be returned from the cache.
                    </li>
                    <li>
                        If there is no match or a stale match, Next.js will fetch the resource from the remote server and update the cache with the downloaded resource.
                    </li>
                </ul>
            </div>
            <pre>{JSON.stringify(forceCache, null, 4)}</pre>
            <hr />
            <div>
                <strong>no-store:</strong>
            </div>
            <div>
                <p>
                    Next.js fetches the resource from the remote server on every request without looking in the cache, and it will not update the cache with the downloaded resource.
                </p>
                <ul>
                    <li>
                        If you don&#039;t provide a <code>cache</code> option, Next.js will default to <code>force-cache</code>, unless a dynamic function such as <code>{'cookies()'}</code> is used, in which case it will default to <code>no-store</code>.
                    </li>
                    <li>
                        The <code>no-cache</code> option behaves the same way as <code>no-store</code> in Next.js.
                    </li>
                </ul>
            </div>
            <pre>{JSON.stringify(noStore, null, 4)}</pre>
            <hr />
        </div>
    );
}