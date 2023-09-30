'use client';

import { userSchema } from "@/src/lib/schemas/user";
import { FC, FormEvent, useCallback, useState } from "react";
import { ZodError } from "zod";
import FormItems from "../components/FormItems";

const Form: FC = () => {
    const [message, setMessage] = useState('');
    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        
        try {
            const target = event.target as HTMLFormElement;
            const form = new FormData(target);

            const data = Object.fromEntries(form.entries());
            const validate = userSchema.parse(data);

            await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(validate),
            });

            setMessage('submit is susecces.');
            target.reset();
        } catch (error: any) {
            if (error instanceof ZodError) {
                const { issues } = error;
                const first = issues[0];

                setMessage(first.message);
                return;
            }

            if (error instanceof Error) {
                setMessage(error.message);
            }
        }
    }, [setMessage]);

    return (
        <form
            className="space-y-10"
            onSubmit={handleSubmit}
        >
            <FormItems message={message} />
            <style jsx global>{`
                .space-y-10 input {
                    color: #000;
                }
            `}</style>
        </form>
    );
};

export default Form;