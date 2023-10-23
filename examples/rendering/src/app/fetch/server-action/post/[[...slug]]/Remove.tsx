'use client'

import { FC } from "react";

const Remove: FC<{ action: () => void }> = ({ action }) => (
    <button onClick={() => action()}>remove cookies</button>
);

export default Remove;