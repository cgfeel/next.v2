import { EmptyObject } from "./deviceStorage";

const parseJSON: (val: string) => Record<string, any>|EmptyObject = value => {
    try {
        return JSON.parse(value);
    } catch (e) {
        console.error(e);
        return {};
    }
};

const arrayify: (item: any) => any[] = item => {
    return item instanceof Array ? item : [item];
}

const objectify: (x: any) => boolean = x => {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}

export { parseJSON, arrayify, objectify };