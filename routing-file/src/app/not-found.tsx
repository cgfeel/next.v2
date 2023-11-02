import Link from "next/link";

export default function NotFound() {
    // console.log('root-not: ', new Date().toLocaleString());
    return (
        <div>
            <h2>Not Found-app in root</h2>
            <p>Could not find requested resource</p>
            <hr />
            <Link href="/">Return Home</Link>
        </div>
    );
}