import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import Link from "next/link";
import List from "../../../components/List";

export const dynamic = 'auto';

export default async function Page() {
    const demand = encodeURIComponent('/file/dynamic/auto-fetch');
    return (
        <>
            <div>
                <Link href={`/api/time/redirect/${demand}/dynamic-auto-fetch`}>Api route</Link>
                <hr />
            </div>
            <List
                items={[
                    <>
                        <code>&#039;auto&#039;</code> {'('}default{')'}: The default option to cache as much as possible without preventing any components from opting into dynamic behavior.
                    </>,
                ]}
            />
        </>
    );
}