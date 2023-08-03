import { FC } from "react";
import ComA from "./ComA";

const ServerComponent: FC = () => (
    <div>
        <div>only the Client Components that are children of the Server Component will be lazy-loaded - not the Server Component itself.</div>
        <ComA />
    </div>
);

export default ServerComponent;