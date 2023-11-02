import { FC, ReactNode } from "react";
import { TimeType } from "../dynamic/layout";
import styles from "../styles.module.css";

interface ListProps {
    items: ReactNode[];
    data?: TimeType;
}

const List: FC<ListProps> = ({ data, items }) => (
    <div>
        <div>
            <strong>description:</strong>
        </div>
        <ul
            className={styles.list}
        >
            {items.map((item, i) => (
                <li key={`list-${i}`}>{item}</li>
            ))}
        </ul>
        <hr />
        <div>
            <strong>fetch data:</strong>
        </div>
        <div>
            <pre>{JSON.stringify(data||{}, null, 4)}</pre>
        </div>
    </div>
);

export default List;