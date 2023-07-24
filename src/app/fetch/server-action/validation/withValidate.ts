export type ItemType = {
    id: number;
    name: string;
};

type ResultType<U> = {
    success: boolean; 
    data: U;
};

const verifyData: (formData: FormData) => boolean = (formData) => {
    const name = (formData.get('name')||'').toString();
    return name.length > 4;
};

const process: (formData: FormData) =>ItemType = (formData) => {
    return {
        id: Date.now(),
        name: (formData.get('name')||'').toString(),
    };
};

export function withValidate<T = any, U = ItemType>(action: (data: U) => ResultType<U>) {
    return async (formData: FormData): Promise<ResultType<U>> => {
        'use service'
        
        const isValidData = verifyData(formData);
        if (!isValidData) {
            throw new Error('Invalid input.');
        }

        const data = process(formData) as U;
        return action(data);
    };
}