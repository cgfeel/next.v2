'use service'

import { ItemType, withValidate } from "./withValidate"

export const action = withValidate<{ success: boolean; data: ItemType }>(data => {
    return {
        success: true,
        data,
    };
});