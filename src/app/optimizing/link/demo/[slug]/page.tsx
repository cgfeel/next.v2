export default function Page({ params }: { params: { slug: `${number}` } }) {
    const { slug } = params;
    return (
        <div>Hello, I&apos;m the {slug} page.</div>
    );
}