"use client";

import { FC, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const Button: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            {children}
        </button>
    );
};

export default Button;
