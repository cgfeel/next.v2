"use client";

import {
    PropsWithChildren,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useOptimistic,
    useTransition,
} from "react";

const List = forwardRef<ListInstance, PropsWithChildren<ListProps>>(({ children, data, remove, send }, ref) => {
    const [, startTransition] = useTransition();
    const [optimisticMessage, addOptimisticMessage] = useOptimistic(
        data.map(message => ({ sending: false, message })),
        (state, message: string) => [...state, { sending: true, message }],
    );

    const submitHandle: ListProps["send"] = useCallback(
        async (msg, create) => {
            addOptimisticMessage(msg);
            send(msg, create);
        },
        [addOptimisticMessage, send],
    );

    useEffect(() => {
        startTransition(() => {
            data.length === 0 && submitHandle("first message", true);
        });
    }, [data, submitHandle, startTransition]);

    useImperativeHandle(ref, () => ({
        submit: async msg => submitHandle(msg),
    }));

    return (
        <>
            {children}
            {optimisticMessage.map(({ message, sending }, i) => (
                <div key={i}>
                    {message} {sending ? "Sending" : i !== 0 && <a onClick={() => remove(i)}>×</a>}
                </div>
            ))}
        </>
    );
});

if (process.env.NODE_ENV !== "production") {
    List.displayName = "CartList";
}

export interface ListInstance {
    submit: (msg: string) => Promise<void>;
}

export interface ListProps {
    data: string[];
    remove: (index: number) => Promise<void>;
    send: (msg: string, create?: boolean) => Promise<void>;
}

export default List;
