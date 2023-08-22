import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <h2>no power in file.</h2>
            <p>click button up power</p>
            <hr />
            <Link
                href="/file/power/login"
            >
                to login
            </Link>
        </div>
    );
}