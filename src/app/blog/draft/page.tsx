import Api from "@/src/utils/api";
import { draftMode } from "next/headers";
import Link from "next/link";

type ItemType = {
    body: string;
    id: number;
    title: string;
    userId: number;
};

type DraftType = { 
    desc: string;
    isEnabled: boolean;
    title: string; 
}

async function getData(): Promise<DraftType> {
    const { isEnabled } = draftMode();
    if (!isEnabled) {
        return {
            title: 'dose not enabled.',
            desc: 'please to revalidate.',
            isEnabled,
        };
    }
    
    const data = await Api.get<ItemType>('https://jsonplaceholder.typicode.com/posts/1');
    return {
        title: data.title,
        desc: data.body,
        isEnabled,
    };
}

export default async function Page() {
    const { desc, isEnabled, title } = await getData();
    return (
        <main>
            <h1>{title}</h1>
            <p>{desc}</p>
            <hr />
            {isEnabled ? (
                <p>
                    <Link
                        href="/api/draft/delete"
                        prefetch={false}
                    >
                        delete
                    </Link>
                </p>
            ) : (
                <p>
                    <Link
                        href="/api/draft?secret=MY_SECRET_TOKEN&slug=test"
                        prefetch={false}
                    >
                        draft model
                    </Link>
                    {' | '}
                    <Link
                        href="/api/draft?secret=MY_SECRET_TOKEN&slug=fail"
                        prefetch={false}
                    >
                        draft fail
                    </Link>
                </p>
            )}
        </main>
    );
}