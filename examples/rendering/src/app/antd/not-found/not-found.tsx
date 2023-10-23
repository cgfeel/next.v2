import Link from "next/link";

export default function NotFound() {
    console.log('not-found-antd: ', new Date().toLocaleString());
    return (
        <div>
            <h2>Not Found: not-found-antd</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    );
}