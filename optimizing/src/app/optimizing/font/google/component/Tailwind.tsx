import { antonio } from "@/src/utils/fonts";
import { FC } from "react";
import Paragraph from "./Paragraph";

const Tailwind: FC = () => (
  <div>
    <h1 className="text-primary font-ibm">With Tailwind CSS: font-ibm.</h1>
    <p className="font-antonio">This is a first paragraph: font-antonio.</p>
    <p className="font-cooper">This is a second paragraph: font-cooper.</p>
    <p>TailWind定义本地字体需要借助styled将其变量全局化</p>
    <div className={`${antonio.variable}`}>
      <Paragraph
        className="font-antonio font-cooper"
        name="antonio and cooper"
      />
    </div>
    <hr />
    <div className="text-primary font-passt border border-sky-500">
      This is a merriweather font pressStart2p.
    </div>
  </div>
);

export default Tailwind;
