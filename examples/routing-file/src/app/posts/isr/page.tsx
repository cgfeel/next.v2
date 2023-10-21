import Api from '@/src/utils/api';

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
  const data = await Api.get<ResultType['data']>('https://jsonplaceholder.typicode.com/posts', {
    next: {
        revalidate: 60
    }
  });
  return { data, time: Date.now() };
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