import { antonio } from "@/src/utils/fonts";
import { FC } from "react";
import Paragraph from "./Paragraph";

const Tailwind: FC = () => (
    <div>
        <h1 
            className="font-ibm"
        >
            With Tailwind CSS: font-ibm.
        </h1>
        <p
            className="font-antonio"
        >
            This is a first paragraph: font-antonio.
        </p>
        <p
            className="font-cooper"
        >
            This is a second paragraph: font-cooper.
        </p>
        <div
            className={`${antonio.variable} font-cooper`}
        >
            <Paragraph name="antonio and cooper" />
        </div>
    </div>
);

export default Tailwind;