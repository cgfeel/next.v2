export default function Page({ params }: PostListProps) {
    const { id } = params;
    return (
        <div>Post: {id}</div>
    );
}

export interface PostListProps {
    params: {
        id: string;
    }
}