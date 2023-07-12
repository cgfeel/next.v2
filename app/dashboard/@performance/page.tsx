import dynamic from "next/dynamic";
import ButtonToPost from "../components/ButtonToPost";

const One = dynamic(() => import('../components/LazyLoadCom'));

export default function Performance() {
    return (
        <div>
            <h2>form performance page</h2>
            <ButtonToPost pid={232} />
            <One />
        </div>
    )
}