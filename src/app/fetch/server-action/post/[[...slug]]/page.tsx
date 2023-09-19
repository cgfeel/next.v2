import Api from "@/src/utils/api";
import { cookies } from "next/headers";
import { removeAction } from "../action";
import styles from "../styles.module.css";
import Remove from "./Remove";

type CommentItemType = {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
};

export default async function Page({ params }: { params: { slug?: string[] } }) {
    const { slug = [] } = params;
    const id = slug[0]||'1';

    const cookieStore = cookies();
    const cookie = cookieStore.get('flush-test-time');

    const data = await Api.get<CommentItemType[]>(`/api/data/posts/time/${id}`, cookie === undefined ? {} : {
        headers: {
            cookie: `flush-test-time=${cookie?.value};`
        }
    });

    if (data instanceof Error) {
        throw data;
    }

    return (
        <div>
            {id === '4' && (
                <div
                    className={styles.remove}
                >
                    <Remove action={removeAction} />
                </div>
            )}
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