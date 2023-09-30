'use client';

import { userSchema } from "@/src/lib/schemas/user";
import { FC, useCallback, useRef, useState } from "react";
import { ZodError, z } from "zod";
import FormItems from "../components/FormItems";

export type SchemaType = z.infer<typeof userSchema>;

interface FormProps {
    action: (data: SchemaType) => Promise<void>;
}

const Form: FC<FormProps> = ({ action }) => {
    const [message, setMessage] = useState('');
    const ref = useRef<HTMLFormElement|null>(null);

    const handleSubmit = useCallback(async (form: FormData) => {
        try {
            const data = Object.fromEntries(form.entries());
            const validate = userSchema.parse(data);

            action(validate);
            setMessage('submit is susecces.');
            
            ref.current?.reset();
        } catch (error: any) {
            if (error instanceof ZodError) {
                const { issues } = error;
                const first = issues[0];

                setMessage(first.message);
            }
        }
    }, [ref, action, setMessage]);

    return (
        <form
            className="space-y-10"
            ref={ref}
            action={handleSubmit}
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