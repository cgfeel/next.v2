export default function PostUserPage({ params }: { params: { uid: string[] } }) {
    const {uid} = params;
    return (
        <div>user - slugs：{uid.join('|')}</div>
    );
}