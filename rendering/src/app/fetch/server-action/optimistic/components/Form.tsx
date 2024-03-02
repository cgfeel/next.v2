"use client";

import { FC, PropsWithChildren, useRef } from "react";
import { ListInstance } from "./List";

const Form: FC<PropsWithChildren<FormProps>> = ({ children, send }) => {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            ref={formRef}
            action={async formData => {
                const message = (formData.get("message") || "").toString();
                if (message === "") return;

                formRef.current?.reset();
                send(message);
            }}>
            {children}
        </form>
    );
};

export interface FormProps extends ListInstance {}

export default Form;
