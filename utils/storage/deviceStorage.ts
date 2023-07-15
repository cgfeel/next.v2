import Api, { ApiResponseType } from '@/utils/api';
import { StorageWithEvents } from './index.jsx';
import { objectify } from './util';

type HookPropType = {
    remove?: boolean;
    uptime?: number;
    flag?: <T>(data: T) => T;
};

type InitPropsType<U = any> = { 
    point: string;
    body?: Record<string, string|number>;
    data?: U;
    expires?: number;
    id?: number;
    method?: string;
    [key: string]: any;
};

const parseOptions: <U = any>(point: string|InitPropsType<U>) => InitPropsType<U> = point => (objectify(point) ? point : { point }) as InitPropsType;

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
    v?: string;
};

/**
 * 数据错误对象：{api, ret, message, data}
 *  - 这里将`data`包括一层`data`是为了保持和`axios`请求返回的数据一致
 * ---
 * 在`Api`和`Storage`两个对象中，不同的地方
 *  - `Api`不会返回`Promise.reject`，因为返回`Promise.reject`就会无限重复请求
 *  - `Storage`遇到错误是返回`Promise.reject`
 */
export class StorageError<T = any> extends Error implements StorageDataType<T> {
    name: string;
    api: string;
    ret: number;
    data: T;
    status: number;
    url: string;
    v: string;

    constructor(info: StorageDataType<T>, url: string, status: number = -1) {
        super(info.message);
        this.name = 'StorageError';
        this.api = info.api;
        this.ret = info.ret||1;    // not 0
        this.data = info.data;
        this.v = info.v||'0.1.0';
        this.url = url;
        this.status = status;

        Object.setPrototypeOf(this, StorageError.prototype);
    }
}

const getOpt = <U>(init: InitPropsType<U>): InitPropsType<U> => {
    const { body = {}, ...opts } = init;
    const option = { body } as InitPropsType<U> & { body: Required<InitPropsType<U>>['body'] };
    for (let i in opts) {
        if (!opts[i]) continue;
        if (i !== 'id') {
            option[i] = opts[i];
        } else {
            option.body[i] = opts[i] as number;
        }
    }
    return option;
};

type StorePromiseType = <T = any, U = any>(init: InitPropsType<U>, hook?: HookPropType) => Promise<T>;
type StorePromiseAllType = <T = any, U = any>(init: InitPropsType<U>, hook?: HookPropType) => Promise<T[]>;

type StoreMethodType = <T = any, U = any>(init: InitPropsType<U>, hook?: HookPropType) => T;
type StoreVoidType = <T = any, U = any>(init: InitPropsType<U>, hook?: HookPropType) => void;

type ActionPromiseProps<U> = { storage: StorageWithEvents, init: InitPropsType<U>, hook?: HookPropType };
type ActionVoidProps<U> = { storage: StorageWithEvents, init?: InitPropsType<U> };

type ActionPromiseType = <T = any, U = any>(info : ActionPromiseProps<U>) => Promise<T>;
type ActionPromiseAllTeype = <T = any, U = any>(info : ActionPromiseProps<U>) => Promise<T[]>;

type ActionMethodType = <T = any, U = any>(info: ActionPromiseProps<U>) => T;
type ActionVoidType = <T = any, U = any>(info: ActionVoidProps<U>) => void;

type StorageAsyncKey = 'get'|'load'|'local';
type StorageAsyncAll = 'getAll'|'loadAll';
type StorageAwaitKey = 'localData'|'push';
type StorageVoidKey = '_allSync'|'clear'|'flush'|'remove';

type ActionGroupType = Record<StorageAsyncKey, ActionPromiseType> & 
                        Record<StorageAsyncAll, ActionPromiseAllTeype> & 
                        Record<StorageAwaitKey, ActionMethodType> & 
                        Record<StorageVoidKey, ActionVoidType>;

type StorageType = Record<StorageAsyncKey, StorePromiseType> &
                    Record<StorageAsyncAll, StorePromiseAllType> & 
                    Record<StorageAwaitKey, StoreMethodType> & 
                    Record<StorageVoidKey, StoreVoidType> & {
    <T = any, U = any>(options: InitPropsType<U> & { type: keyof Exclude<ActionGroupType, '_allSync'> }, hook?: HookPropType): Promise<T[]>|Promise<T>|T|boolean|void;
    config: {
        prefix: string;
        driver: string;
        defaultExpires: number;
        flushTime: number;
        userTokenKey: string;
    };
    save: <T = any>(init: InitPropsType<T>) => boolean;
    signature: () => SignatureType;
    userToken: () => null|UserTokenType;
    userCreate: (info: UserTokenType) => UserTokenType;
    userUpdate: (action: 'active'|'update') => UserTokenType|null;
};

type StorageTypetKey = Exclude<keyof ActionGroupType, '_allSync'>;

const action: ActionGroupType = {
    async load<T, U>({ storage, init, hook }: ActionPromiseProps<U>): Promise<T> {
        const point = init.id ? `${init.point}.${init.id}` : init.point;

        const { flag, remove: flush = false, uptime = 0 } = (hook||{}) as HookPropType;

        flush && storage.remove(point);
        const option = getOpt<U>(init);

        let record: { value: T; timestamp: number; now: number; up: number; }|null = null;
        let now = new Date().getTime();

        if (storage.hasKey(point)) {
            record = storage.get(point) as { value: T; timestamp: number; now: number; up: number; };
            if (record.timestamp && record.timestamp < now) {
                storage.remove(point);
                record = null;
            }
        }
        if (record) {
            // 拿到数据后，判断是否需要静默更新
            uptime && record.up + uptime < now && fetchData<T, U>({
                extraFetchOptions: option,
                someFlag: flag
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
            }, point));
        }

        return fetchData<T, U>({
            extraFetchOptions: option,
            someFlag: flag
        });
    },
    async loadAll<T, U>({ storage, init, hook }: ActionPromiseProps<U>): Promise<T[]> {
        const { flag, remove: flush = false, uptime = 0 } = (hook||{}) as HookPropType;

        let ids = [] as string[];
        let allsync = {
            value: {
                error: 1, cost: 0, ret: -1,
            }, 
            up: 0, 
            timestamp: 0
        };

        if (flush) {
            storage.remove(init.point);
        } else if (storage.hasKey(init.point + 'AllSync')) {
            allsync = storage.get(init.point + 'AllSync') as { value: Record<'error'|'cost'|'ret', number>, up: number; timestamp: number };
            ids = storage.keys().filter(name => name.indexOf(init.point+'.') === 0);
        }

        let results = [] as T[];
        const cache = !flush && allsync.value.ret !== 1 && ids.length && allsync.value.cost === ids.length;
        if (cache) {
            results = await Promise.all(
                ids.map(key => Storage({
                    type: 'load',
                    point: key,
                }))
            ) as T[];
        }

        // 如果有缓存的情况下，没有后台更新时间或者是还未到更新时间，直接返还缓存数据
        if (cache && !(uptime && uptime + allsync.up < Date.now())) {
            return results;
        }
        const option = getOpt(init);

        // 如果是启用缓存数据，则后台更新返回缓存数据，否则加载远程数据
        if (cache) {
            fetchAllData<T, U>({
                extraFetchOptions: option,
                someFlag: flag
            });
        } else {
            results = await fetchAllData<T, U>({
                extraFetchOptions: option,
                someFlag: flag
            });
        }
        return results;
    },
    async get<T, U>({ storage, init, hook }: ActionPromiseProps<U>): Promise<T> {
        init.method = 'get';
        return action.load<T, U>({storage, init, hook});
    },
    async getAll<T, U>({ storage, init, hook }: ActionPromiseProps<U>): Promise<T[]> {
        init.method = 'get';
        return action.loadAll<T, U>({storage, init, hook});
    },
    async local<T, U>({ storage, init, hook }: ActionPromiseProps<U>): Promise<T> {
        init.method = 'local';
        return action.load<T, U>({storage, init, hook});
    },
    /**
     * 插入数据，插入的数据对象必须已经存在，且有效期内，否则只能返回插入的数据
     */
    push<T, U>({ storage, init }: ActionPromiseProps<U>): T {
        const { point, data, id } = init as InitPropsType;
        const key = !id ? point : `${point}.${id}`;
        if (!storage.hasKey(key)) {
            return data;
        }
        
        const info = storage.get(key) as { value: T, timestamp: number };
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
    // save<T, U = any>({ storage, init, hook }: ActionPromiseProps<U>): boolean {},
    remove<T, U>({ storage, init }: ActionVoidProps<U>): void {
        const { point, id, expires } = init as InitPropsType;
        const key = !id ? point : `${point}.${id}`;
        if (storage.keys().indexOf(key) < 0) {
            return;
        }

        storage.remove(key);
        id && action._allSync<T, U>({
            storage: storage,
            init: {
                point: point,
                expires: expires
            }
        });
    },
    flush<T, U>({ storage }: ActionVoidProps<U>): void  {
        const flush = storage.get('stoargeFlushAll');
        const now = new Date().getTime();
        if (flush && flush.timestamp > now) {
            return;
        }

        Storage.save<number>({
            point: 'stoargeFlushAll',
            data: now,
            expires: 86400 * 1000
        });
        storage.keys().forEach(name => {
            const data = storage.get(name) as { data: T, timestamp: number };
            data.timestamp < now && storage.remove(name);
        });
    },
    clear<T, U>({ storage }: ActionVoidProps<U>): void {
        storage.clear();
    },
    localData<T, U>({ storage, init }: ActionPromiseProps<U>): T {
        const { point } = (init||{}) as InitPropsType;
        return storage.get(point) as T;
    },
    _allSync<T, U>({storage, init}: ActionVoidProps<U>): void {
        // 不公开的方法
        const { point, expires } = (init||{}) as InitPropsType;
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

// function Storage<T = any>(options: InitPropsType<T> & { type: keyof Exclude<ActionGroupType, '_allSync'> }, hook?: HookPropType): Promise<T[]>|Promise<T>|T|boolean|void {
const Storage = <StorageType>(<T, U>(options: InitPropsType<U> & { type: keyof Exclude<ActionGroupType, '_allSync'> }, hook?: HookPropType) => {
    const { type = 'load', ...opts } = options;
    const instance = new StorageWithEvents(
        Storage.config.prefix, Storage.config.driver
    );

    return action[type]<T, U>({
        storage: instance,
        hook: hook,
        init: opts,
    });
})

export type UserTokenType = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    action?: 'active'|'update';
};

Storage.save = <T>(info: InitPropsType<T>): boolean => {
    const { point, data, id, expires } = info;
    if (!data || !point) return false;
    const storage = new StorageWithEvents(
        Storage.config.prefix, Storage.config.driver
    );

    const now = Date.now();
    const timestamp = now + (expires||Storage.config.defaultExpires);
    const value = {
        value: data,
        timestamp: timestamp,
        up: now
    };

    const key = !id ? point : `${point}.${id}`;
    const save = storage.set(key, value);
    id && action._allSync<{}, {}>({
        storage: storage,
        init: {
            point: point,
            expires: timestamp,
        }
    });

    return save;
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
        action: 'active' as UserTokenType['action'],
    };
    Storage.save<UserTokenType>({
        point: Storage.config.userTokenKey,
        data,
    });

    Storage({ type: 'remove', point: STORAGE_KEY.API_QUEUE });
    Storage({ type: 'remove', point: STORAGE_KEY.SIGNATURE });
    return data as UserTokenType;
};

Storage.userUpdate = (action: 'active'|'update'): UserTokenType|null => {
    const token = Storage.userToken();
    if (token === null) return token;

    const data  = {
        ...token,
        action,
    };
    token && token.action !== action && Storage.save<UserTokenType>({
        point: Storage.config.userTokenKey,
        data,
    });
    return data as UserTokenType;
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
        }, {} as SignatureIndexType);
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
            Object.keys(index).length === 0 ? Storage({ type: 'remove', point: STORAGE_KEY.SIGNATURE }) : Storage.save<SignatureIndexType>({
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
    userTokenKey: 'userToken',
};

function createMethod <T, U>(type: StorageTypetKey) { 
    return (init: InitPropsType<U>, hook?: HookPropType) => Storage({ type, ...parseOptions<U>(init) }, hook);
}

['load', 'loadAll', 'get', 'getAll', 'local', 'localData', 'save', 'push', 'remove', 'flush', 'clear'].forEach(method => {
    const key = method as Exclude<keyof ActionGroupType, '_allSync'>;
    Storage[key] = createMethod(key) as Storage[Exclude<keyof ActionGroupType, '_allSync'>];
});

// Storage.flush();

type FetchDataProps<U> = {
    extraFetchOptions: InitPropsType<U>;
    someFlag: HookPropType['flag'];
};

const fetchData = async <T, U = any>(params: FetchDataProps<U>): Promise<T> => {
    const { extraFetchOptions, someFlag } = params;

    // const point = extraFetchOptions.body.key;

    const { body, point, method } = extraFetchOptions;
    const response: ApiResponseType<T> = await Api[method === 'get' ? 'Get' : 'Post'](point, body);

    const info = someFlag ? someFlag(response) : response;
    if (info.ret !== 0) {
        return Promise.reject(new StorageError(info, info instanceof StorageError ? info.url : info.api));
    }

    /*let responseData = response.data;

    if (someFlag) {
        responseData = someFlag(responseData);
    }
    if (responseData.error > 0) {
        return Promise.reject(new StorageError(responseData));
    }*/

    const expires = extraFetchOptions.expires ? {expires: extraFetchOptions.expires} : {};
    const { id } = extraFetchOptions.body as { id?: number };

    Storage.save<T>({
        point: point,
        data: info.data,
        id,
        ...expires
    });
    return info.data;
};

const fetchAllData = async <T, U = any>(params: FetchDataProps<U>): Promise<T[]> => {
    const {
        extraFetchOptions, someFlag
    } = params;

    const { body, point, method, expires } = extraFetchOptions;
    const response: ApiResponseType<T[]> = await Api[method === 'get' ? 'Get' : 'Post'](point, body);

    // 如果有flag，先用flas去处理，哪怕遇到错误了
    const info = someFlag ? someFlag(response) : response;
    if (info.ret !== 0) {
        return Promise.reject(new StorageError(info, info instanceof StorageError ? info.url : info.api));
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

    // let list = [] as T[];
    for (let i in info.data) {
        const id = parseInt(i);
        Storage.save<T>({
            point,
            id,
            data: info.data[id],
            ...(expires ? { expires } : {})
        });
    }
    return info.data;
};

export default Storage;