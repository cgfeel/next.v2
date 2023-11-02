import Nav from "@/src/components/nav";
import { PropsWithChildren } from "react";
import styles from "../styles.module.css";

export type TimeType = {
    abbreviation: string;
    client_ip: string;
    datetime: string;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from: null;
    dst_offset: number;
    dst_until: null;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
    week_number: number;
}

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