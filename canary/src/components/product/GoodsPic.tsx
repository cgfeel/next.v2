import Image from "next/image";
import { FC } from "react";
import { Product } from "./product";

const GoodsPic: FC<GoodsPicProps> = ({ image, name }) => (
    <div 
        className="col-span-2 md:order-1 md:col-span-1"
    >
        <div
            className="space-y-2"
        >
            <div 
                className="relative aspect-square"
            >
                <Image
                    className="block rounded-lg grayscale"
                    alt={name}
                    sizes="(min-width: 1184px) 200px, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                    src={`/ppr/${image}`}
                    fill
                    priority
                />
            </div>
            <div 
                className="flex gap-x-2"
            >
                <div
                    className="relative aspect-square w-1/3"
                >
                    <Image
                        className="rounded-lg grayscale"
                        alt={name}
                        sizes="(min-width: 1184px) 75px, (min-width: 768px) 8.33vw, 16.66vw"
                        src={`/ppr/${image}`}
                        fill
                        priority
                    />
                </div>
                <div
                    className="relative aspect-square w-1/3"
                >
                    <Image
                        className="rounded-lg grayscale"
                        alt={name}
                        sizes="(min-width: 1184px) 75px, (min-width: 768px) 8.33vw, 16.66vw"
                        src={`/ppr/${image}`}
                        fill
                        priority
                    />
                </div>
                <div
                    className="relative aspect-square w-1/3"
                >
                    <Image
                        className="rounded-lg grayscale"
                        alt={name}
                        sizes="(min-width: 1184px) 75px, (min-width: 768px) 8.33vw, 16.66vw"
                        src={`/ppr/${image}`}
                        fill
                        priority
                    />
                </div>
            </div>
        </div>
    </div>
);

export interface GoodsPicProps extends Pick<Product, 'image'|'name'> {}

export default GoodsPic;