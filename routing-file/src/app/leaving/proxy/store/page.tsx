import Link from "@/src/components/proxyProvider/Link";
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
            <Btn 
                href="/leaving/proxy/test"
            >
                button - click to test
            </Btn>
            <hr />
            <Btn>
                goback - click go back
            </Btn>
        </div>
    );
}