import { antonio } from "@/src/utils/fonts";
import { FC } from "react";
import styles from "../About.module.css";
import Paragraph from "./Paragraph";

const About: FC = () => (
    <div>
        <Paragraph className={styles.text} name="antonio" />
        <div
            className={antonio.variable}
        >
            <Paragraph name="antonio" />
        </div>
    </div>
);

export default About;