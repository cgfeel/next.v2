import { cookies } from "next/headers";
import AddToCart from "./AddToCart";

export default async function AddToCartFromCookies() {
    // Get the cart count from the users cookies and pass it to the client
    // AddToCart component
    const cartCount = Number(cookies().get('_cart_count')?.value||'0');
    return <AddToCart initialCartCount={cartCount} />;
}