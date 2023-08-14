import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import Link from "next/link";
import List from "../../../components/List";

export const preferredRegion = 'auto';

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
    return (
        <List
            data={data}
            items={[
                <>
                    Learn more about the <Link href="https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes" target="_blank">Edge and Node.js runtimes</Link>{' (link)'}.
                </>,
                <>
                    Support for <code>preferredRegion</code>, and regions supported, is dependent on your deployment platform.
                </>,
                <>
                    <Link 
                        href="https://vercel.com/docs/concepts/edge-network/regions"
                        target="_blank"
                    >
                        Vercel Edge Network Regions
                    </Link>
                    {' (link)'}
                </>,
                <>
                    <Link 
                        href="https://vercel.com/docs/concepts/functions/edge-functions#regional-edge-function-invocation"
                        target="_blank"
                    >
                        Regional Edge Function invocation
                    </Link>
                    {' (link)'}
                </>,
                <>
                    <Link 
                        href="https://blog.cloudflare.com/announcing-workers-smart-placement/"
                        target="_blank"
                    >
                        Smart Placement speeds up applications by moving code close to your backend — no config needed
                    </Link>
                    {' (link)'}
                </>,
            ]}
        />
    );
}