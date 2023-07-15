export default function PostUserPage({ params }: { params: { uid: string[] } }) {
    const [type, id] = params.uid;
    return (
        <div>user - type：{type} - uid：{id}</div>
    );
}