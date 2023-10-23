import { FC, Suspense } from "react";
import { AlbumsItemsType, getArtist, getArtistAlbums } from "../../service";

const Albums: FC<{ promise: Promise<AlbumsItemsType[]> }> = async ({ promise }) => {
    const albums = await promise;
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
    const artistData = getArtist(id);
    const albumData = getArtistAlbums(id);

    const artist = await artistData;
    return (
        <>
            <h1>{artist.title}</h1>
            <hr />
            <Suspense
                fallback={<div>Loading...</div>}
            >
                <Albums promise={albumData} />
            </Suspense>
        </>
    );
}