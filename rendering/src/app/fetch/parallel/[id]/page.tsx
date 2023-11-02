import { FC } from "react";
import { AlbumsItemsType, getArtist, getArtistAlbums } from "../../service";

const Albums: FC<{ list: AlbumsItemsType[]; }> = ({ list }) => (
    <ul>
        {list.map((album, i) => (
            <li
                key={i}
            >
                {album.name}
            </li>
        ))}
    </ul>
);

export default async function page({ params: { id } }: {
    params: { id: `${number}` };
}) {
    const artistData = getArtist(id);
    const albumsData = getArtistAlbums(id);

    const [artist, albums] = await Promise.all([artistData, albumsData]);
    return (
        <>
            <h1>{artist.title}</h1>
            <hr />
            <Albums list={albums} />
        </>
    );
}