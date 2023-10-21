import { FC } from "react";

const Stream: FC = async () => {
    const data = await fetch(`${process.env.HOME_URL}/api/stream`);
    const text = await data.text();
    return (
        <div dangerouslySetInnerHTML={{ __html: text }} />
    );
};

export default Stream;