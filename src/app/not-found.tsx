import { headers } from "next/headers";
import Link from "next/link";
import Api from "../utils/api";
import { TimeType } from "./blog/time/page";

export default function NotFound() {
    // const headerList = headers();
    // const domain = headerList.get('host');
    // const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');

    // 测试时请自行打开，否则buid时会疯狂抛log
    // console.log('root-not: ', new Date().toLocaleString());
    return (
        <div>
            <h2>Not Found-app in root</h2>
            <p>Could not find requested resource</p>
            <hr />
            <p>domian: {/*domain*/}</p>
            <hr />
            <Link href="/">Return Home</Link>
        </div>
    );
}