import { FC } from "react";
import { Product } from "../product";

const range = [<div className="text-sm text-vercel-cyan">Out of stock</div>];

const ProductLowStockWarning: FC<LowStockWarngingProps> = ({ stock }) => stock > 3 ? null : (
    range[stock]||<div className="text-sm text-vercel-cyan">Only {stock} left in stock</div>
);

export interface LowStockWarngingProps extends Pick<Product, 'stock'> {}

export default ProductLowStockWarning;