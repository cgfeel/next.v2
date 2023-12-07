import { cookies } from "next/headers";
import CartCount from "./CartCount";

export default async function CartCountFromCookies() {
    const cartCount = Number(cookies().get('_cart_count')?.value || '0');
    return <CartCount initialCartCount={cartCount} />
}