export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>Multiple Icon page - id: {id}.</div>
    );
}