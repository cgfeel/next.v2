'use client'

import { Button } from "antd";
import { FC } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const SubmitButton: FC = () => {
    const { pending } = useFormStatus();
    return (
        <button
            className="w-20 disabled:opacity-100"
            type="submit"
            disabled={pending}
        >
            {pending ? "Loading..." : "Join"}
        </button>
    );
};

export default SubmitButton;