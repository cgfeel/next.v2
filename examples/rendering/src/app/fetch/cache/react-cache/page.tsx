import { getTime } from "./service";

export default async function Layout() {
    const data = await getTime(1);
    return (
        <div>react cache page time: {data.fromDateTime}</div>
    );
}