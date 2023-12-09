import Link from "next/link";
import "../../form.css";

export default function Page() {
    return (
        <div>
            <h1>Form</h1>
            <div>
                <input name="first-name" />
            </div>
            <hr />
            <Link href="/leaving/form/test">click to test</Link>
        </div>
    );
}