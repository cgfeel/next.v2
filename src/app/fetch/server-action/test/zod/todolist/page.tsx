import Api from "@/src/utils/api";
import AddForm from "../components/AddForm";
import styles from "./index.module.css";
import DelForm from "../components/DelForm";

type ItemType = {
    id: number;
    name: string;
    created_at: string;
};

// db server from https://memfiredb.com/
// U can use https://neon.tech/

export default async function Page() {
    const todolist = await Api.get<ItemType[]>('https://ckbbmba5g6h95mu41o8g.baseapi.memfiredb.com/rest/v1/todolist?select=*', {
        headers: {
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIzMzkwODUyNSwiaWF0IjoxNjk1OTg4NTI1LCJpc3MiOiJzdXBhYmFzZSJ9.I_mTI_fOTJZPLD0HBwDcgE1qFUDmwVSr8TL5vTWQagk',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIzMzkwODUyNSwiaWF0IjoxNjk1OTg4NTI1LCJpc3MiOiJzdXBhYmFzZSJ9.I_mTI_fOTJZPLD0HBwDcgE1qFUDmwVSr8TL5vTWQagk',
        },
    });
    return (
        <main
            className={styles.todo}
        >
            <h1 className="sr-only">Todos</h1>
            <AddForm />
            <ul>
                {todolist.map(({ id, name }) => (
                    <li 
                        key={id}
                    >
                        {name}
                        <DelForm id={id} todo={name} />
                    </li>
                ))}
            </ul>
        </main>
    );
}