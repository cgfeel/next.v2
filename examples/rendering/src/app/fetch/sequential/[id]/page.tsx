import { FC, Suspense } from "react";
import { ArtistType, getArtist, getArtistAlbums } from "../../service";

const Albums: FC<Pick<ArtistType, 'id'>> = async ({ id }) => {
    const point = id.toString() as `${number}`;
    const albums = await getArtistAlbums(point);
    return (
        <ul>
            {albums.map((album, i) => (
                <li
                    key={i}
                >
                    {album.body}
                </li>
            ))}
        </ul>
    );
};

export default async function Page({ params: { id } }: {
    params: { id: `${number}` };
}) {
    const artist = await getArtist(id);
    return (
        <>
            <h1>{artist.title}</h1>
            <hr />
            <Suspense
                fallback={<div>Loading...</div>}
            >
                <Albums id={artist.id} />
            </Suspense>
        </>
    );
}