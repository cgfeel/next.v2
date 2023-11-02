import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return children;
}

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