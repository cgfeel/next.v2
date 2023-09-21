import Image from "next/image";
import logo from "http://up1.yii.so/jianli/static/vercel.png";
import Canvas from "./Canvas";
import styles from "./index.module.css";

export default function Page() {
    // const square = new URL('http://up1.yii.so/jianli/static/square.js', import.meta.url);
    const square = new URL('http://up1.yii.so/canvas-confetti', import.meta.url);
    return (
        <div>
            <h1>
                urlImports
            </h1>
            <Canvas />
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