"use client";

import { useRouter } from "next/navigation";
import { FC, memo, useCallback, useState } from "react";
import SubmitButton from "./SubmitButton";
import { submitEmail } from "./action";

type errorItem = {
    error: boolean;
    message: string;
};

const Form: FC = () => {
    const [data, setData] = useState("");
    const router = useRouter();

    const formAction = useCallback(
        async (data: FormData) => {
            const info: errorItem | undefined = await submitEmail(data);
            if (info?.error) {
                setData(info.message);
            }
        },
        [setData],
    );

    return (
        <form className="not-prose grid w-full max-w-sm gap-1.5" action={formAction}>
            <div className="grid w-full gap-1.5">
                <div className="flex w-full items-end gap-1.5">
                    <div className="grid w-full gap-1.5">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            placeholder="me@domain.com"
                            type="email"
                            style={{ backgroundColor: "#666" }}
                            required
                        />
                    </div>
                    <SubmitButton error={data !== ""} />
                </div>
                <p className="text-muted-foreground text-xs">
                    {data === "" ? "Enter any fake email schema." : <span className="text-red-600">{data}</span>}
                </p>
            </div>
        </form>
    );
};

export default memo(Form);
