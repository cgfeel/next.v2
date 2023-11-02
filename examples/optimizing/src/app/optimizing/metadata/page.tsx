import Api from "@/src/utils/api";
import { PostType } from "./layout";


export default async function Page() {
    const data = await Api.get<PostType>(`https://jsonplaceholder.typicode.com/posts/1`);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        image: 'https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.png',
        name: data.title,
        description: data.body,
    };

    return (
        <section>
            <div>User metadata object.</div>
            <script 
                id="jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </section>
    );
}