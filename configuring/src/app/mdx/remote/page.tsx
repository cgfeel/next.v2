import Api from "@/src/utils/api";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from 'next-mdx-remote/serialize'

export default async function Page() {
    const source = await Api.get<string>('https://raw.githubusercontent.com/cgfeel/next.v2/master/README.md');
    return (
        <MDXRemote source={source} />
    );
}