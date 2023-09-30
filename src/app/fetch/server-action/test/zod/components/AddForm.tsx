'use client';

import { FC, useCallback, useRef, useState } from "react";
import { experimental_useFormStatus as useFromStatus } from "react-dom";
import { createTodo } from "../todolist/action";

const SubmitButton: FC = () => {
    const { pending } = useFromStatus();
    return (
        <button
            type="submit"
            disabled={pending}
        >
            Add
        </button>
    );
};

const AddForm: FC = () => {
    const [message, setMessage] = useState('');
    const ref = useRef<HTMLFormElement>(null);

    const submitHandle = useCallback(async (formData: FormData) => {
        const info = await createTodo(formData);
        setMessage(info.message);
        ref.current?.reset();
    }, [ref, setMessage]);

    return (
        <form
            className="add-form"
            action={submitHandle}
            ref={ref}
        >
            <label
                htmlFor="todo"
            >
                Enter Task
            </label>
            <input 
                id="todo"
                name="todo"
                type="text"
                required
            />
            <SubmitButton />
            <p
                aria-live="polite"
                className="sr-only"
                role="status"
            >
                {message}
            </p>
        </form>
    );
};

export default AddForm;