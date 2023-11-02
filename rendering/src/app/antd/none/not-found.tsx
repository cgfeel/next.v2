import Link from "next/link";

// 做这个文件只想证明：
// 在路由段没有抛出not-found时，只在app根目录进行捕获

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