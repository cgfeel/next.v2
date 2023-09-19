import Api from "@/src/utils/api";
import styles from "../styles.module.css";

type CommentItemType = {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
};

export default async function Page({ params }: { params: { slug?: string[] } }) {
    const { slug = [] } = params;
    const data = await await Api.get<CommentItemType[]>(`https://jsonplaceholder.typicode.com/posts/${slug[0]||'1'}/comments`);

    return (
        <div>
            <div
                className={styles.time}
            >
                request time: {new Date().toLocaleString()}
            </div>
            <div 
                className={styles.search}
            >
                <ul>
                    {data.map(item => (
                        <li 
                            key={item.id}
                        >
                            <h3>{item.name}</h3>
                            <div>{item.body}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}