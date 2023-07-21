import { getArtist } from "./service";

export default async function Page() {
    const data = await getArtist(1);
    return (
        <div>{data.title}</div>
    );
}