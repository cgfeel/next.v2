import { antonio } from "@/src/utils/fonts";
import { FC } from "react";
import styles from "../About.module.css";
import Paragraph from "./Paragraph";

const About: FC = () => (
  <div>
    <p>字体仅在作用域内生效：</p>
    <Paragraph className={styles.text} name="antonio" />
    <div className={antonio.variable}>
      <Paragraph name="antonio" className={styles.text} />
    </div>
  </div>
);

export default About;
