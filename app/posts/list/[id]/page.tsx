'use client'
import Api, { ApiResponseType } from '@/utils/api';
import { usePathname, useSearchParams  } from 'next/navigation';
import { FC } from 'react';
import useSWR from 'swr';

type PostItemType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const getPostsData: (url: string) => Promise<PostItemType[]> = async url => {
  const res: ApiResponseType<PostItemType[]> = await Api.get(url);
  return res;
};

export default function List({ params }: { params: { pid: string } }) {
  const { id } = params;
  const { data: posts, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', getPostsData);
  return posts ? (
    <div>
      <p>Post: {id}</p>
      {posts.map((post, key) => (
        <p key={key}>{post.title}</p>
      ))}
    </div>
  ) : (
    <div>fetchin posts...</div>
  );
};