'use client';

import { experimental_useOptimistic as useOptimistic, FC, PropsWithChildren, useRef } from "react";
import { send } from "./action";

const List: FC<PropsWithChildren<{}>> = ({ children }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const item = { message: "first message", sending: false } as ItemType;

    const [optimisticMessage, addOptimisticMessage] = useOptimistic<ItemType[], string>(
        [item], (state, message) => [...state, { sending: true, message }]
    );

    return (
        <div>
            {optimisticMessage.map((m, i) => (
                <div
                    key={i}
                >
                    {m.message} {m.sending ? 'Sending' : ''}
                </div>
            ))}
            <form
                ref={formRef}
                action={async (formData) => {
                    const message = (formData.get('message') || '').toString();
                    if (message === '') return;

                    formRef.current?.reset();
                    addOptimisticMessage(message);

                    await send(message);
                }}
            >
                {children}
            </form>
        </div>
    );
};

type ItemType = {
    message: string;
    sending: boolean;
};

export default List;