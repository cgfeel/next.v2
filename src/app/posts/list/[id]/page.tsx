'use client'
import Api, { ApiResponseType } from '@/src/utils/api';
import Storage from '@/src/utils/storage/deviceStorage'
import { usePathname, useSearchParams  } from 'next/navigation';
import { FC, useEffect } from 'react';
import useSWR from 'swr';

type PostItemType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const getPostsData: (url: string) => Promise<PostItemType[]> = async url => {
  const res: PostItemType[] = await Api.get(url);
  return res;
};

export default function List({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: posts, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', getPostsData);

  useEffect(() => {
    Storage.local<number[]>({
      point: 'test'
    }).catch(
      (err) => console.log('none')
    )
  }, []);

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