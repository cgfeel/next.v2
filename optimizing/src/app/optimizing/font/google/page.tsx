import {
  antonio,
  dancingScript,
  ibmSans,
  inter,
  merriweather,
  oswald,
  pressStart2p,
  raleway,
  roboto,
  robotoArray,
} from "@/src/utils/fonts";
import Paragraph from "./component/Paragraph";
import StyleNode from "./component/StyleNode";
import "./font.css";
import About from "./component/About";
import LocalFont from "./component/LocalFont";
import Tailwind from "./component/Tailwind";

export default function Page() {
  return (
    <div style={{ fontSize: 30 }}>
      <div className={inter.className}>This is a inter font.</div>
      <div className={roboto.className}>This is a roboto font.</div>
      <div className={robotoArray.className}>This is a roboto array font.</div>
      <hr />
      <div className={oswald.className}>
        <h1 className={dancingScript.className}>
          This is a dancing script font.
        </h1>
        This is a oswald font.
      </div>
      <hr />
      <div style={oswald.style}>This is a oswald font style.</div>
      <hr />
      <div className={merriweather.className}>
        This is a merriweather font (non-variable).
      </div>
      <hr />
      <div className={raleway.className}>
        <Paragraph />
      </div>
      <hr />
      <StyleNode />
      <hr />
      <About />
      <hr />
      <LocalFont />
      <hr />
      <div
        className={`${antonio.variable} ${ibmSans.variable} ${pressStart2p.variable}`}
      >
        <Tailwind />
      </div>
    </div>
  );
}
