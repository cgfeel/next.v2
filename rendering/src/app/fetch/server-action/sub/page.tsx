import { cookies } from "next/headers";
import { submitAction } from "./action";
import BtnAction from "./BtnAction";
import SubBtn from "./SubBtn";
import { submitAction as submit } from "./subAction";


export default function Page() {
    const time = cookies().get('__test_sub')?.value||'';
    async function test() {
        'use server'
        submitAction();
    }
    /*async function send() {
        'use server'
        submit();
    }*/
    return (
        <div>
            <p>test: {time}</p>
            <p>click button will trigger twice in server action.</p>
            {/*<SubBtn action={send} />*/}
            <hr />
            <BtnAction action={test} />
        </div>
    );
}