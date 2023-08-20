import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "../styles.module.css";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div
            className={styles.list}
        >
            <div>
                <Link href="/func/params">index</Link>
                {' | '}
                <Link href="/func/params/1">slug</Link>
                {' | '}
                <Link href="/func/params/shop/1/2">shop</Link>
                {' | '}
                <Link href="/func/params/blog/1/2">blog</Link>
            </div>
            <hr />
            {children}
        </div>
    );
}