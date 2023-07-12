const parseJSON = value => {
    try {
        return JSON.parse(value);
    } catch (e) {
        console.error(e);
        return value;
    }
};

const arrayify = item => {
    return item instanceof Array ? item : [item];
}

const objectify = x => {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}

export { parseJSON, arrayify, objectify };