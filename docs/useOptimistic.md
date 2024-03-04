# 通过`useOptimistic`乐观更新实现消息列表

演示：

https://github.com/cgfeel/next.v2/assets/578141/7b6b350f-27b2-4509-98c7-d91c76d72761

列表处理文件：https://github.com/cgfeel/next.v2/blob/master/rendering/src/app/fetch/server-action/optimistic/components/List.tsx

### 表单状态`useFormStatus`

这个最好理解，根据表单提交状态，获取状态中的数据和等待状态，唯一需要注意的是它必须被`<form>`包裹，不能在同一层级也不能是`<form>`的父级

### 乐观更新`useOptimistic`

演示代码：

```
    const [optimisticMessage, addOptimisticMessage] = useOptimistic(
        data.map(message => ({ sending: false, message })),
        (state, message: string) => [...state, { sending: true, message }],
    );
```

将它和`useStatus`作为比较来理解，相同点：

- 都返回一个数组参数，包含有：第一个是当前的状态，第二个是更新方法
- `hook`本身接受的第一个参数均为初始值

不同点：

- `useStatus`一旦赋予初始值后，将不再接受初始值的更新，必须通过返回的数组中的更新方法来更新
- `useOptimistic`接受初始值每一次的更新之外，也接受来自返回的数组中的更新方法来更新
- 除此之外`useOptimistic`还接受一个函数作为第二个参数，用于作为乐观更新的规则

注意点：

- `useOptimistic`返回的更新方法只能通过`form`的`action`触发
- `action`之外触发更新，需要包裹`startTransition`，这也是为什么初始值是通过下面代码来设置

```
    useEffect(() => {
        startTransition(() => {
            data.length === 0 && submitHandle("first message", true);
        });
    }, [data, submitHandle, startTransition]);
```

cookies操作：https://github.com/cgfeel/next.v2/blob/master/rendering/src/app/fetch/server-action/optimistic/action.ts

注意点：

 - `cookies`只能在服务端组件中使用
 - 除了查询以外其他操作均需要在`server action`中进行
