import Link from "../../components/Link";
import "../../form.css";
import Btn from "./Btn";

export default function Page() {
    return (
        <div>
            <h1>Form</h1>
            <div>
                <input name="first-name" />
            </div>
            <hr />
            link - <Link href="/leaving/proxy/test">click to test</Link>
            <hr />
            button - <Btn />
        </div>
    );
}