'use client'

import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import { FC } from "react"
import useSWR from 'swr';

const getPostsData: (url: string) => Promise<TimeType> = async url => {
    return await Api.get<TimeType>(url);
};

const Time: FC = () => {
    const { data, isLoading, mutate } = useSWR('http://worldtimeapi.org/api/timezone/Asia/Shanghai', getPostsData);
    return isLoading ? (
        <div>load client time...</div>
    ) : (
        <div>
            <div>client time: {data?.datetime}</div>
            <button
                onClick={() => mutate()}
            >
                click to uptime
            </button>
        </div>
    );
};

export default Time;