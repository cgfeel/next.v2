import { FC } from "react";

const Stream: FC = async () => {
    const data = await fetch('http://localhost:3000/api/stream');
    const text = await data.text();
    return (
        <div dangerouslySetInnerHTML={{ __html: text }} />
    );
};

export default Stream;