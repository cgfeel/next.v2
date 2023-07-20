export default async function Page() {
    // fetch错误不会抛出错误
    /*const data = await fetch('http://localhost:3000/api/error', {
        method: 'POST',
    });

    const info = await data.json();
    console.log(data.status, info);*/

    // 抛出异常时会被error捕获, 测试时打开，否则bulild不通过
    // throw new Error('test');
    return (
        <div>display to error page</div>
    );
}