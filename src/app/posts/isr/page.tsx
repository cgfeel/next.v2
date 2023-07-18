import Api from '@/src/utils/api';
import { FC } from 'react';

type PostItemType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type ResultType = {
    data: PostItemType[];
    time: number;
};

const getPostsData: () => Promise<ResultType> = async () => {
  const res = await Api.get<ResultType>('http://localhost:3000/api/items', {
    next: {
        revalidate: 60
    }
  });
  return res;
};

export const revalidate = 60;

export default async function Post() {
  const { data: posts, time } = await getPostsData();
  
  return (
    <div>
      <p>isr page: {time}</p>
      <hr />
      {posts.map((post, key) => (
        <p key={key}>{post.title}</p>
      ))}
    </div>
  );
};