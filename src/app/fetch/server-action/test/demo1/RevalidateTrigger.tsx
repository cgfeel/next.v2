'use client'

import { FC } from "react";
import { refresh } from "./action";

const RevalidateTrigger: FC = () => {
    return (
        <button
            onClick={() => refresh()}
        >
            Revalidate `data` Tag
        </button>
    );
};

export default RevalidateTrigger;