import Api from "@/src/utils/api";
import { ImageResponse } from "next/og";
import { PostType } from "../../layout";

export async function generateImageMetadata({ params }: { params: { id: string; } }) {
    const { id } = params;
    const num = parseInt(id)||1;

    const data = await Api.get<ItemType[]>(`https://jsonplaceholder.typicode.com/posts/${num}/comments`);
    return data.map(({ id, name: alt }) => ({
        contentType: 'image/png',
        size: { width: 1200, height: 600 },
        alt,
        id
    }));
}

export default async function Image({ params, id }: {
    params: { id: string; };
    id: number;
}) {
    const { id: productId } = params;
    const imageId = id;

    const data = await Api.get<PostType>(`https://jsonplaceholder.typicode.com/posts/${productId}`);
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    padding: 48,
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                post-id: {productId} || img-id: {imageId}<br />title: {data.title}
            </div>
        )
    );
}

type ItemType = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};