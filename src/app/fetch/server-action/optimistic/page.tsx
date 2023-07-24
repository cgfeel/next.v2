'use client'

import { LegacyRef, experimental_useOptimistic as useOptimistic, useRef } from "react";
import { send } from "./action";

type ItemType = {
    message: string;
    sending: boolean;
};

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);
    const item = { message: 'first message', sending: false } as ItemType;

    const [optimisticMessages, addOptimisticMessage] = useOptimistic<ItemType[], string>(
        [item], (state, newMessage) => [...state, { message: newMessage, sending: true }]
    );

    return (
        <div>
            {optimisticMessages.map((m, i) => (
                <div 
                    key={i}
                >
                    {m.message}
                    {m.sending ? 'Sending...' : ''}
                </div>
            ))}
            <form
                ref={formRef}
                action={async formData => {
                    const message = (formData.get('message')||'').toString();
                    if ('' === message) return;

                    formRef.current?.reset();
                    addOptimisticMessage(message);
                    
                    await send(message);
                }}
            >
                <input 
                    type="text" 
                    name="message" 
                    style={{ backgroundColor: '#666' }}
                />
                <button
                    type="submit"
                >
                    提交
                </button>
            </form>
        </div>
    );
}