import Image from "next/image";
import { name } from "http://up1.yii.so/jianli/static/square.js";
import logo from "http://up1.yii.so/jianli/static/vercel.png";
import styles from "./index.module.css";

export default function Page() {
    const square = new URL('http://up1.yii.so/jianli/static/square.js', import.meta.url);
    return (
        <div>
            <div>
                urlImports name: {name}
            </div>
            <hr />
            <div>{square.pathname}</div>
            <hr />
            <div className={styles.box}></div>
            <div>
                <Image src={logo} placeholder="blur" alt="" />
            </div>
        </div>
    );
}