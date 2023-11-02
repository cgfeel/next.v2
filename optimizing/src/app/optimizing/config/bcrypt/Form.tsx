'use client';

import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const Form: FC<PropsWithChildren<FormProps>> = ({ children, action }) => {
    const router = useRouter();
    return (
        <form
            action={async () => {
                await action();
                router.refresh();
            }}
        >
            {children}
        </form>
    );
};

export interface FormProps {
    action: () => Promise<void>;
};

export default Form;