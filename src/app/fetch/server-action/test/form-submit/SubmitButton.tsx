'use client'

import { Button } from "antd";
import { FC } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const SubmitButton: FC<{ error: boolean }> = ({ error }) => {
    const { pending } = useFormStatus();
    const disabled = pending && !error;
    return (
        <button
            className="w-20 disabled:opacity-100"
            type="submit"
            disabled={disabled}
        >
            {disabled ? "Loading..." : "Join"}
        </button>
    );
};

export default SubmitButton;