import Link from "next/link";

// 做这个文件只想证明not-found文件只在app根目录有效
export default function NotFound() {
    console.log('none-antd: ', new Date().toLocaleString());
    return (
        <div>
            <h2>Not Found: none-antd</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    );
}