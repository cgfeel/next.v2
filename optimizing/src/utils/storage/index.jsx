import Storage from './storage';
import StorageWithEvents from './storageWithEvents';
import { arrayify } from './util';

export default function unit({ WrappedComponent, safeOptions, ...props} ) {
    const { prefix = 'app_', drivers = 'local' } = safeOptions;

    arrayify(drivers).map(driver => {
        const apiName = `${String(driver)}Storage`;
        props[apiName] = new StorageWithEvents(prefix, driver);
    });

    return (
        <WrappedComponent {...props} />
    );
}

export { Storage, StorageWithEvents };