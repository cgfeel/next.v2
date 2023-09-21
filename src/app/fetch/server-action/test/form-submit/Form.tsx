'use Client'

import { FC } from "react"
import SubmitButton from "./SubmitButton";
import { submitEmail } from "./action";

const Form: FC = () => {
    return (
        <form
            className="not-prose grid w-full max-w-sm gap-1.5"
            action={submitEmail}
        >
            <div 
                className="grid w-full gap-1.5"
            >
                <div 
                    className="flex w-full items-end gap-1.5"
                >
                    <div 
                        className="grid w-full gap-1.5"
                    >
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            name="email"
                            placeholder="me@domain.com"
                            type="email"
                            required
                        />
                    </div>
                    <SubmitButton />
                </div>
                <p 
                    className="text-muted-foreground text-xs"
                >
                    Enter any fake email schema.
                </p>
            </div>
        </form>
    );
};

export default Form;