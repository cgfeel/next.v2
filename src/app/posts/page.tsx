'use client'
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const Post: FC = () => {
  const router = useRouter();
  return <p>Post</p>
}

export default Post