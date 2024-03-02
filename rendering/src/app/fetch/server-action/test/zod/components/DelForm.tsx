"use client";

import { FC, useCallback, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteTodo } from "../todolist/action";

interface DelFormProps {
    id: number;
    todo: string;
}

const DeleteButton: FC = () => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            Delete
        </button>
    );
};

const DelForm: FC<DelFormProps> = ({ id, todo }) => {
    const [message, setMessage] = useState("");
    const ref = useRef<HTMLFormElement>(null);

    const submitHandle = useCallback(
        async (formData: FormData) => {
            const info = await deleteTodo(formData);
            console.log(info);
            setMessage(info.message);
            ref.current?.reset();
        },
        [ref, setMessage],
    );

    return (
        <form action={submitHandle} ref={ref}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="todo" value={todo} />
            <DeleteButton />
            <p aria-live="polite" className="sr-only" role="status">
                {message}
            </p>
        </form>
    );
};

export default DelForm;
