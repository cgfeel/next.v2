export default async function Page() {
    // 抛出异常时会被error捕获
    const a = {};
    a.map();
    return (
        <div>display to error sublist page</div>
    );
}