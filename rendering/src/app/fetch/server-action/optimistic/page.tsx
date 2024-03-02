import { cookies } from "next/headers";
import { get, remove, send } from "./action";
import ListForm from "./components";
import Button from "./components/Button";
import styles from "./index.module.css";

const NAME = "optimistic-list";

export default async function page() {
    const data = await get(NAME);
    async function removeHandle(index: number) {
        "use server";
        await remove(NAME, index);
    }
    async function sendHandle(msg: string, create?: boolean) {
        "use server";
        await send(NAME, msg, create);
    }

    return (
        <div className={styles.wrapper}>
            <ListForm data={data} remove={removeHandle} send={sendHandle}>
                <input name="message" type="text" />
                <Button>Submit</Button>
            </ListForm>
        </div>
    );
}
