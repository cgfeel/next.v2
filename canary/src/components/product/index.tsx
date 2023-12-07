import Description from "./Description";
import GoodsPic from "./GoodsPic";
import Pricing from "./pricing";
import { Product } from "./product";

export default async function SingleProduct() {
    const product: Product = await fetch(`${process.env.HOME_URL}/api/products?id=1`).then(
        res => res.json()
    );

    const { image, name } = product;
    return (
        <div
            className="grid grid-cols-4 gap-6"
        >
            <GoodsPic 
                image={image}
                name={name}
            />
            <div
                className="col-span-2 md:order-3 md:col-span-1"
            >
                <Pricing product={product} />
            </div>
            <Description product={product} />
        </div>
    );
}