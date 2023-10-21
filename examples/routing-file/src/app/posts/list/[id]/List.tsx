'use client';

import Api from "@/src/utils/api";
import Storage from "@/src/utils/storage/deviceStorage";
import { FC, PropsWithChildren, useEffect } from "react";
import useSWR from "swr";

type PostItemType = {
    body: string;
    id: number;
    title: string;
    userId: number;
}

const getPostsData: (url: string) => Promise<PostItemType[]> = async url => {
    return await Api.get<PostItemType[]>(url);
};

const List: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { data: posts } = useSWR('https://jsonplaceholder.typicode.com/posts', getPostsData);

    useEffect(() => {
        Storage.local<number[]>({
            point: 'test'
        }).catch(
            () => console.log('none')
        );
    }, []);
    
    return (
        <div>
            {children}
            <ul>
                {posts?.map((post, key) => (
                    <li
                        key={key}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;