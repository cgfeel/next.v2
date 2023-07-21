import { FC, Suspense } from "react";
import { AlbumsItemsType, ArtistType, getArtist, getArtistAlbums } from "../../service";

const Albums: FC<Pick<ArtistType, 'id'>> = async ({ id }) => {
    const albums = await getArtistAlbums(id);
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

export const revalidate = 3600;

export default async function Page({ params: { id } }: {
    params: { id: `${number}` };
}) {
    const artist =  await getArtist(id);
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