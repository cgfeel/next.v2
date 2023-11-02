import 'react';
import 'react-dom';

declare module 'react' {
    export const experimental_useOptimistic: <T extends any, Q extends any>(
        T, func: (state: T, msg: Q) => T
    ) => [T, (data: Q) => void];
}

declare module 'react-dom' {
    export const experimental_useFormStatus: () => {
        pending: boolean;
    };
}