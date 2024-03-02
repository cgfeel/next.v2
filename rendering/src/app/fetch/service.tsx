export type ArtistType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export type AlbumsItemsType = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export async function getArtist(id: `${number}`): Promise<ArtistType> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
    return res.json();
}

export async function getArtistAlbums(id: `${number}`): Promise<AlbumsItemsType[]> {
    const rest = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return rest.json();
}
