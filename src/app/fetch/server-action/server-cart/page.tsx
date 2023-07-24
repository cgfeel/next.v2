import { cookies } from "next/headers"

export default function Page() {
    async function addItem(data: Record<string, any>) {
        'use server'

        const cart = cookies().get('myCookie')?.value;
        console.log(cart);
    }

    async function submitImage() {
        'use server'

        console.log('submit image');
    }

    return (
        <form 
            action={addItem}
        >
            <p>
                <input 
                    type="image" 
                    src="/photo/609d6bc5cc55be62018df74561414d4cb077f3a9a05d4-EUDMv6.jpeg"
                    width={100}
                    formAction={submitImage} 
                />
            </p>
            <button 
                type="submit"
            >
                Add to Server Cart
            </button>
        </form>
    );
}