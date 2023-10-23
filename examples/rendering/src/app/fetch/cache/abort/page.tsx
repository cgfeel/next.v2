export default async function Page() {
    // 在服务端阻止fetch会抛出错误，所以这里暂且屏蔽了
    /*const controller = new AbortController();  // 创建一个控制器
    const { signal } = controller; // 返回一个 AbortSignal 对象实例，它可以用来 with/abort 一个 DOM 请求

    signal.addEventListener('abort', () => {
        console.log('aborted!');
    });
    
    fetch('/api/time', { signal });
    setTimeout(() => {
        controller.abort();
    }, 100);*/

    return (
        <div>page</div>
    );
}