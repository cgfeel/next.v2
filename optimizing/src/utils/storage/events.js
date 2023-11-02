import { parseJSON } from './util';

let listeners = {};

class Events {

    constructor() {
        window.addEventListener('storage', this._chan, false);
    }
    
    _onChange(event) {
        const methods = listeners[event.key];
        if (methods) {
            const newValue = parseJSON(event.newValue);
            const oldValue = parseJSON(event.oldValue);

            methods.map(method => {
                method.call(this, newValue, oldValue, event.url);
            });
        }
    }

    on(key, fn) {
        if (listeners[key]) {
            listeners[key].push(fn);
        } else {
            listeners[key] = [fn];
        }
    }

    off(key, fn) {
        const methods = listeners[key];
        if (methods && methods.length > 1) {
            methods.splice(methods.indexOf(fn), 1);
        } else {
            delete listeners[key];
        }
    }

    clear(key) {
        if (key) {
            delete listeners[key];
        } else {
            listeners = {};
        }
    }

    listeners() {
        return listeners;
    }
}

export default Events;