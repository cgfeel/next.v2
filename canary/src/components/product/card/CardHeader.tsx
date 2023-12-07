import Image from "next/image";
import { FC } from "react";
import { Product } from "../product";
import ProductBestSeller from "./ProductBsetSeller";

const CardHeader: FC<CardHeaderProps> = ({ product: { image, imageBlur, isBestSeller, name } }) => (
    <div 
        className="relative aspect-square"
    >
        {isBestSeller && <ProductBestSeller />}
        <Image
            className="rounded-xl grayscale group-hover:opacity-80"
            placeholder="blur"
            sizes="(min-width: 1184px) 200px, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
            alt={name}
            blurDataURL={imageBlur}
            src={`/ppr/${image}`}
            fill
        />
    </div>
);

export interface CardHeaderProps {
    product: Product;
}

export default CardHeader;