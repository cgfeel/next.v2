import Link from "next/link";
import { notFound } from "next/navigation";
import { hasPower } from "../lib";

export default function NotFound() {
    if (!hasPower()) {
        notFound();
    }
    return (
        <div>
            <h1>Out of page, is 404</h1>
            <hr />
            <Link href="/">Click to Home</Link>
        </div>
    );
}