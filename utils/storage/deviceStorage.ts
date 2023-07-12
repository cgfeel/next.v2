import { StorageWithEvents } from './index.jsx';
import { objectify } from './util';

const parseOptions = message => (objectify(message) ? message : { message });

/*function StorageError(data) {
    this.name = 'StorageError';
    this.data = {...data};
}

StorageError.prototype = new Error();
StorageError.prototype.constructor = StorageError;*/

export const STORAGE_KEY = {
    API_QUEUE: 'apiQueue',
    SIGNATURE: 'signature',
};

export interface StorageDataType<T> {
    api: string;
    ret: number;
    message: string;
    data: T;
    v: string;
};

/**
 * 数据错误对象：{api, ret, message, data}
 *  - 这里将`data`包括一层`data`是为了保持和`axios`请求返回的数据一致
 * ---
 * 在`Api`和`Storage`两个对象中，不同的地方
 *  - `Api`不会返回`Promise.reject`，因为返回`Promise.reject`就会无限重复请求
 *  - `Storage`遇到错误是返回`Promise.reject`
 */
export class StorageError<T> extends Error implements StorageDataType<T> {
    name: string;
    api: string;
    ret: number;
    data: T;
    status: number;
    url: string;
    v: string;

    constructor(info: StorageDataType, url: string, status: number = -1) {
        super(info.message);
        this.name = 'StorageError';
        this.api = info.api;
        this.ret = info.ret||1;    // not 0
        this.data = info.data;
        this.v = info.v;
        this.url = url;
        this.status = status;

        Object.setPrototypeOf(this, StorageError.prototype);
    }
}

const getOpt = init => {
    const option = { body: init.body||{} };
    let i;
    
    for (i in init) {
        if (i === 'body') {
            continue;
        } else if (['id'].indexOf(i) < 0) {
            option[i] = init[i];
        } else {
            option.body[i] = init[i];
        }
    }
    return option;
};

const action = {
    async load({storage, init, hook}) {
        const point = init.id ? `${init.point}.${init.id}` : init.point;

        const reback = hook||{};
        const flush = reback.remove||hook === true;

        flush && storage.remove(point);
        const option = getOpt(init);

        let record = null;
        let now = new Date().getTime();

        if (storage.hasKey(point)) {
            record = storage.get(point);
            if (record.timestamp && record.timestamp < now) {
                storage.remove(point);
                record = null;
            }
        }
        if (record) {
            // 拿到数据后，判断是否需要静默更新
            const uptime = reback.uptime || 0;
            uptime && record.up + uptime < now && fetchData({
                extraFetchOptions: option,
                someFlag: reback.flag
            }).catch(() => {});

            return record.value;
        }
        if (point.indexOf('AllSync') > 0 || option.method === 'local') {
            return Promise.reject(new StorageError({
                api: point,
                ret: 1, 
                message: 'data none~', 
                data: {},
                v: '1.0',
            }));
        }

        return fetchData({
            extraFetchOptions: option,
            someFlag: reback.flag
        });
    },
    async loadAll({storage, init, hook}) {
        const reback = hook||{};
        const flush = reback.remove||hook === true;

        let ids = [];
        let allsync = {
            value: {
                error: 1, cost: 0
            }, 
            up: 0, 
            timestamp: 0
        };

        if (flush) {
            storage.remove(init.point);
        } else if (storage.hasKey(init.point + 'AllSync')) {
            allsync = storage.get(init.point + 'AllSync');
            ids = storage.keys().filter(name => name.indexOf(init.point+'.') === 0);
        }

        let results;
        const cache = !flush && allsync.value.ret !== 1 && ids.length && allsync.value.cost === ids.length;
        if (cache) {
            results = await Promise.all(
                ids.map(key => Storage.load({
                    point: key
                }))
            );
        }

        // 如果有缓存的情况下，没有后台更新时间或者是还未到更新时间，直接返还缓存数据
        const uptime = reback.uptime && reback.uptime + allsync.up < new Date().getTime();
        if (cache && !uptime) {
            return results;
        }
        const option = getOpt(init);

        // 如果是启用缓存数据，则后台更新返回缓存数据，否则加载远程数据
        if (cache) {
            fetchAllData({
                extraFetchOptions: option,
                someFlag: reback.flag
            });
        } else {
            results = await fetchAllData({
                extraFetchOptions: option,
                someFlag: reback.flag
            });
        }
        return results;
    },
    async get({storage, init, hook}) {
        init.method = 'get';
        return action.load({storage, init, hook});
    },
    async getAll({storage, init, hook}) {
        init.method = 'get';
        return action.loadAll({storage, init, hook});
    },
    async local({storage, init, hook}) {
        init.method = 'local';
        return action.load({storage, init, hook});
    },
    /**
     * 插入数据，插入的数据对象必须已经存在，且有效期内，否则只能返回插入的数据
     */
    push({storage, init}) {
        const { point, data, id } = init;
        const key = !id ? point : `${point}.${id}`;
        if (!storage.hasKey(key)) {
            return data;
        }
        
        const info = storage.get(key);
        const now = new Date().getTime();
        if (info.timestamp && info.timestamp < now) {
            action.remove({storage, init});
            return data;
        }

        info.value = {
            ...(objectify(info.value) ? info.value : { value: info.value }),
            ...(objectify(data) ? data : { data })
        };

        storage.set(key, info);
        return info.value;
    },
    save({storage, init}) {
        const { point, data, id, expires } = init;
        if (!data || !point) {
            return false;
        }

        const now = new Date().getTime();
        const value = {
            value: data,
            timestamp: now + (expires||Storage.config.defaultExpires),
            up: now
        };

        const key = !id ? point : `${point}.${id}`;
        const save = storage.set(key, value);
        id && action._allSync({
            storage: storage,
            init: {
                point: point,
                expires: expires
            }
        });

        return save;
    },
    remove({storage, init}) {
        const { point, id, expires } = init;
        const key = !id ? point : `${point}.${id}`;
        if (storage.keys().indexOf(key) < 0) {
            return;
        }

        storage.remove(key);
        id && action._allSync({
            storage: storage,
            init: {
                point: point,
                expires: expires
            }
        });
    },
    flush({storage}) {
        const flush = storage.get('stoargeFlushAll');
        const now = new Date().getTime();
        if (flush && flush.timestamp > now) {
            return;
        }

        action.save({
            storage: storage, 
            init: {
                point: 'stoargeFlushAll',
                data: now,
                expires: 86400 * 1000
            }
        });
        storage.keys().forEach(name => {
            const data = storage.get(name);
            data.timestamp < now && storage.remove(name);
        });
    },
    clear({storage}) {
        storage.clear();
    },
    localData({ storage, init }) {
        return storage.get(init.point);
    },
    _allSync({storage, init}) {
        // 不公开的方法
        const { point, expires } = init;
        const ids = storage.keys().filter(name => name.indexOf(point + '.') === 0);
        const now = new Date().getTime();

        if (!ids.length) {
            return storage.remove(`${point}AllSync`);
        }
        storage.set(`${point}AllSync`, {
            value: {
                cost: ids.length,
                error: 0
            },
            timestamp: now + (expires||Storage.config.defaultExpires),
            up: now
        });
    }
};

function Storage(options = {}, hook) {
    const type = options.type && action[options.type] ? options.type : 'load';
    const instance = new StorageWithEvents(
        Storage.config.prefix, Storage.config.driver
    );

    return action[type]({
        storage: instance,
        init: options,
        hook: hook
    });
}

export type UserTokenType = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    action?: 'active'|'update';
};

Storage.userToken = (): null|UserTokenType => {
    const storage = new StorageWithEvents(
        Storage.config.prefix, Storage.config.driver
    );

    const token = storage.get(Storage.config.userTokenKey);
    if (token && token.timestamp < new Date().getTime()) {
        storage.remove(Storage.config.userTokenKey);
        return null;
    }
    return token ? token.value : null;
};

Storage.userCreate = (info: UserTokenType): UserTokenType => {
    const data = {
        ...info,
        action: 'active',
    };
    Storage.save({
        point: Storage.config.userTokenKey,
        data,
    });

    Storage.remove({ point: STORAGE_KEY.API_QUEUE });
    Storage.remove({ point: STORAGE_KEY.SIGNATURE });
    return data;
};

Storage.userUpdate = (action: 'active'|'update'): UserTokenType|null => {
    const token = Storage.userToken();
    if (token === null) return token;

    const data  = {
        ...token,
        action,
    };
    token && token.action !== action && Storage.save({
        point: Storage.config.userTokenKey,
        data,
    });
    return data;
};

export type EmptyObject = Record<string|number|symbol, never>;
export type SignatureItemType = {
    code: string;
    time: number;
};

export type SignatureIndexType = Record<string, SignatureItemType>|EmptyObject;
export type SignatureType = {
    geter: () => SignatureIndexType;
    seter: (key: string, value: string) => void;
};

Storage.signature = (): SignatureType => {
    const storage = new StorageWithEvents(
        Storage.config.prefix, Storage.config.driver
    );

    const geter = (): SignatureIndexType => {
        const index: SignatureIndexType = (storage.get(STORAGE_KEY.SIGNATURE)||{}).value||{};
        return Object.keys(index).reduce((current, key) => {
            return index[key].time + 18000 * 1000 < Date.now() ? current : {
                ...current,
                [key]: index[key],
            };
        }, {} as SignatureItemType);
    };

    return {
        geter,
        seter: (key: string, code: string = '') => {
            if (key === '') return;
            const index = geter();
            const empty = code === '';

            if (empty) {
                (undefined !== index[key]) && delete index[key];
            } else {
                index[key] = {
                    time: Date.now(),
                    code,
                };
            }
            Object.keys(index).length === 0 ? Storage.remove({ point: STORAGE_KEY.SIGNATURE }) : Storage.save({
                point: STORAGE_KEY.SIGNATURE, 
                data: { ...index },
            });
        },
    };
};

Storage.config = {
    prefix: 'app_',
    driver: 'local',
    defaultExpires: 1000 * 86400 * 7,
    flushTime: 1000 * 86400,
    userTokenKey: 'userToken'
};

const createMethod = type => (init, hook) => Storage({
    type, ...parseOptions(init)
}, hook);

['load', 'loadAll', 'get', 'getAll', 'local', 'localData', 'save', 'push', 'remove', 'flush', 'clear'].forEach(method => {
    Storage[method] = createMethod(method);
});

// Storage.flush();

const fetchData = async params => {
    const {
        extraFetchOptions, someFlag
    } = params;

    // const point = extraFetchOptions.body.key;

    const point = extraFetchOptions.point;
    const response = await Api[extraFetchOptions.method === 'get' ? 'Get' : 'Post'](point, extraFetchOptions.body);

    const info = someFlag ? someFlag(response.data) : response.data;
    if (info.ret !== 0) {
        return Promise.reject(new StorageError(info));
    }

    /*let responseData = response.data;

    if (someFlag) {
        responseData = someFlag(responseData);
    }
    if (responseData.error > 0) {
        return Promise.reject(new StorageError(responseData));
    }*/

    const expires = extraFetchOptions.expires ? {expires: extraFetchOptions.expires} : {};
    Storage.save({
        point: point,
        id: extraFetchOptions.body.id,
        data: info.data,
        ...expires
    });
    return info.data;
};

const fetchAllData = async params => {
    const {
        extraFetchOptions, someFlag
    } = params;

    const point = extraFetchOptions.point;
    const response = await Api[extraFetchOptions.method === 'get' ? 'Get' : 'Post'](point, extraFetchOptions.body);

    // 如果有flag，先用flas去处理，哪怕遇到错误了
    const info = someFlag ? someFlag(response.data) : response.data;
    if (info.ret !== 0) {
        return Promise.reject(new StorageError(info));
    }

    /*const data = someFlag ? someFlag(response.data) : response.data;

    console.log(response);

    if (!someFlag) {
        return response.data.ret > 0 ? Promise.reject(new StorageError(response.data)) : response.data;
    }

    const saveData = someFlag(response.data);
    if (saveData.error > 0) {
        return Promise.reject(new StorageError(saveData));
    }*/

    let list = [];
    let i = '';
    const expires = extraFetchOptions.expires ? {expires: extraFetchOptions.expires} : {};
    for (i in info.data) {
        list.push(info.data[i]);
        Storage.save({
            point,
            id: i,
            data: info.data[i],
            ...expires
        });
    }
    return list
};

export default Storage;