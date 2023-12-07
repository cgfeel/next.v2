import { add, format, isTomorrow } from "date-fns";
import { FC } from "react";
import { Product } from "../product";

const ProductEstimatedArrival: FC<EstimatedArrivalProps> = ({ leadTime, hasDeliveryTime = false }) => {
    const date = add(new Date(), { days: leadTime });
    return (
        <div
            className="text-sm text-gray-300"
        >
            Get it{' '}
            <strong
                className="font-bold text-gray-100"
            >
                {isTomorrow(date) && 'tomorrow, '}
                {format(date, 'MM-d')}
            </strong>
            {hasDeliveryTime && <> by 5pm</>}
        </div>
    );
};

export interface EstimatedArrivalProps extends Pick<Product, 'leadTime'> {
    hasDeliveryTime?: boolean;
}

export default ProductEstimatedArrival;