import Api from "@/src/utils/api";
import { getTime } from "./cache";

type ItemType = {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
};

export default async function List(){
    const id = await getTime();
    const data = await Api.get<ItemType[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
        cache: 'no-store'
    });

    return (
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
    );
};