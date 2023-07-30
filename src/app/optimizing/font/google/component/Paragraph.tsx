import { FC } from "react";

type ParagraphProps = {
    className?: string;
    name?: string;
};

const Paragraph: FC<ParagraphProps> = ({ className, name }) => (
    <p
        className={className}
    >
        This paragraph is children from wrapper component, which used {name||'raleway'} font.
    </p>
);

export default Paragraph;