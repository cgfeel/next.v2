import { cookies } from "next/headers";
import { addItem, changeItem } from "./action";

export default function Page() {
    const cookieStore = cookies();

    const myCookie = cookieStore.get('myCookie');
    const allCookies = cookieStore.getAll();
    const hasMycookie = Boolean(cookies().get('myCookie'));
    
    const ramdom = cookieStore.get('ramdom');
    const ramdomSecure = cookieStore.get('ramdom-secure');
    const ramdomTime = cookieStore.get('ramdom-time');

    const authorName = cookieStore.get('author-name');
    const authorAge = cookieStore.get('author-age');
    const authorSex = cookieStore.get('author-sex');
    const authorLocation = cookieStore.get('author-location');

    return (
        <div>
            <div>mycookie: </div>
            <pre>{JSON.stringify(myCookie, null, 4)}</pre>
            <hr />
            <div>all cookies:</div>
            <pre>{JSON.stringify(allCookies, null, 4)}</pre>
            <hr />
            <div>has cookie: use `get` instead of <code>{"`cookieStore.has('myCookie')`"}</code> when use revalidatePath</div>
            <pre>{JSON.stringify(hasMycookie, null, 4)}</pre>
            <hr />
            <div>radom cookes:</div>
            <pre>ramdom . {JSON.stringify(ramdom, null, 4)}</pre>
            <pre>ramdom-secure . {JSON.stringify(ramdomSecure, null, 4)}</pre>
            <pre>ramdom-time . {JSON.stringify(ramdomTime, null, 4)}</pre>
            <form
                action={addItem}
            >
                <button type="submit">update</button>
            </form>
            <hr />
            <div>change cookes:</div>
            <pre>author-name . {JSON.stringify(authorName, null, 4)}</pre>
            <pre>author-name . {JSON.stringify(authorAge, null, 4)}</pre>
            <pre>author-name . {JSON.stringify(authorSex, null, 4)}</pre>
            <pre>author-name . {JSON.stringify(authorLocation, null, 4)}</pre>
            <form
                action={changeItem}
            >
                <button type="submit">update</button>
            </form>
            <hr />
        </div>
    );
}