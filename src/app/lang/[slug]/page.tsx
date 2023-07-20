import { getDictionary } from "./dictionaries";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
    const dict = await getDictionary(slug === 'en' ? slug : 'nl');
    return (
        <button>{dict.products.cart}</button>
    );
}