import Storage from './storage';
import Events from './events';

class StorageWithEvents extends Storage {

    constructor(prefix = 'app_', driver='local') {
        super(prefix, driver);
        this.events = new Events();
    }

    on(key, fn) {
        this.events.on(this.prefixKey(key), fn);
        return this;
    }

    off(key, fn) {
        this.events.off(this.prefixKey(key), fn);
        return this;
    }

    clearEvents(key) {
        const mayBeKey = key ? this.prefixKey(key) : false;
        this.events.clear(mayBeKey);

        return this;
    }
};

export default StorageWithEvents;