"use client";

import {
    FC,
    PropsWithChildren,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useOptimistic,
    useTransition,
} from "react";
import { useFormStatus } from "react-dom";

const DeleteItem: FC = () => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            {pending ? "Removing" : "×"}
        </button>
    );
};

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
            <ul>
                {optimisticMessage.map(({ message, sending }, i) => (
                    <li key={i}>
                        {message}{" "}
                        {sending
                            ? "Sending"
                            : i !== 0 && (
                                  <form action={() => remove(i)}>
                                      <DeleteItem />
                                  </form>
                              )}
                    </li>
                ))}
            </ul>
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
