import { usePathname, useSearchParams  } from 'next/navigation';
import { FC } from 'react';

type PostItemType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const getPostsData: () => Promise<PostItemType[]> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

export default async function Post({ params }: { params: { pid: string } }) {
  const posts = await getPostsData();
  const { pid } = params;
  return (
    <div>
      <p>Post: {pid}</p>
      {posts.map((post, key) => (
        <p key={key}>{post.title}</p>
      ))}
    </div>
  );
};