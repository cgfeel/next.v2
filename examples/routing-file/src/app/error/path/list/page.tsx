export default async function Page() {
    // 抛出异常时会被error捕获，测试时打开，否则不能build
    // throw new Error('test');
    return (
        <div>display to error sublist page</div>
    );
}