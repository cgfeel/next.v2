import Storage, { EmptyObject, StorageDataType, STORAGE_KEY, StorageError, SignatureType, SignatureIndexType, UserTokenType } from '@/utils/storage/deviceStorage';
// import { Modal } from 'antd';
import get from 'lodash/get';
import pull from 'lodash/pull';
import random from 'lodash/random';
// import { history } from 'umi';
import { extend, RequestOptionsInit } from 'umi-request';

const API_URL = 'https://jsonplaceholder.typicode.com';
const PREFIX_URI = '/';
const LOGIN_URL = '/auth/login';

export const REFRESH_URL = `${API_URL}${PREFIX_URI}/refresh`;
export const controller = new AbortController();

export type ApiResponseType<T extends []|Record<string, any>> = StorageDataType<T>|StorageError<T>;

type ApiWaitType = {
    type: string;
    time: number;
};

type ApiQueueType = {
    id: number;
    token: null|UserTokenType;
};

type ApiOptionsType = RequestOptionsInit & Partial<ApiQueueType> & {
    signal: AbortSignal;
    point?: string;
};

const { signal } = controller;
signal.addEventListener('abort', () => {
    console.log('aborted!');
});

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    429: '请求过于频繁，已被服务器拒绝。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const errorHandler = async error => {
    const { response } = error;
    if (!response) {
        return error;
    }

    const { url, status, statusText } = response;
    try {
        if (response.statusData && response.statusData.ret) {
            return new StorageError(response.statusData, url, status);
        }
        const resData = await response.json();
        return new StorageError(resData, url, status);
    } catch (e) {
        return new StorageError({
            api: url,
            ret: status,
            message: (codeMessage[status]||'请求错误') + (statusText ? `：${statusText}` : ''),
            data: {},
        }, url, status);
    }
};

const waitUntil = async (prop: ApiWaitType, res: bool = false) => {
    const { time, ...info } = prop;
    return await new Promise((resolve, reject) => {
        setTimeout(() => res ? resolve(info) : reject(info), time);
    });
};

// 返回null继续定时循环，其他返回
const loadUntil = async (time: number, call: (start: number) => null|UserTokenType|StorageError) => {
    const start = Date.now();
    const data = await call(start);
    return await new Promise((resolve, reject) => {
        if (null !== data) return data instanceof StorageError ? reject(data) : resolve(data);
        const _timer = setInterval(async () => {
            const data = await call(start);
            if (null !== data) {
                clearInterval(_timer);
                data instanceof StorageError ? reject(data) : resolve(data);
            }
          }, time);
    });
};

const apiQueue = async (url: string, options: ApiOptionsType): ApiQueueType => {
    const { headers = {}, data = {}, signature = '' } = options;
    let { id = 0 } = options;

    const http = url.indexOf('http') === 0;
    const uri = http ? url : url.replace('../', '');

    const without = (http && uri.indexOf(API_URL) < 0) || ['forget', 'login', 'refresh', 'register'].indexOf(uri) >= 0;
    const token = await (without ? { token: null, id } : UserToken.get().then(info => info).catch(err => err));
    if (!token.access_token) {
        return token.type === undefined ? token : await Promise.reject(token);
    }

    if ('' !== signature) {
        const signIndex = await getSignature([signature], true);
        if (signIndex[signature]) {
            headers['signature'] = signIndex[signature].code;
            options.headers = headers;
        } else {
            return await Promise.reject(new StorageError({
                api: url,
                ret: 101,
                message: '获取口令失败，请联系技术解决问题',
                data: {},
            }));
        }
    }
    
    const list = await Storage.local({
        point: STORAGE_KEY.API_QUEUE,
    }).catch(
        () => ([])
    );

    const isset = id > 0 && list.indexOf(id) >= 0;
    if (!isset) {
        if (list.length > 60) {
            return await waitUntil({ type: 'apiWait', time: 5000 });
        }

        while (true) {
            id = random(10000000, 99999999);
            if (list.indexOf(id) < 0) break;
        }
    }

    Storage.save({
        point: STORAGE_KEY.API_QUEUE,
        data: [
            ...list,
            id,
        ],
    });
    return { token, id };
};

const apiQueueOut = async (id: number) => {
    const list = await Storage.local({
        point: STORAGE_KEY.API_QUEUE,
    }).catch(
        () => ([])
    );
    list.length > 0 && Storage.save({
        point: STORAGE_KEY.API_QUEUE,
        data: pull(list, id),
    });
};

const UserToken = {
    async get(): Promise<null|UserTokenType|ApiWaitType> {
        const token = Storage.userToken<null|UserTokenType>();

        if (token === null) return Promise.reject({ type: 'logout' });
        if (token.action === 'active') return token;

        const info = await waitUntil({ type: 'apiWait', time: 5000 });
        return info;
    },
    async refresh(refresh_token: string, id: number = 0): Promise<UserTokenType|StorageError> {
        return await loadUntil(500, async (start) => {
            const token = Storage.userToken<null|UserTokenType>();
            const {refresh_token: current_token = '',  action = ''} = token||{};

            if (action === 'update') return null;
            if (current_token !== refresh_token && action === 'active') return token;

            Storage.userUpdate('update');
            const info: ApiResponseType = await Api.Post('refresh', {
                id,
                data: {
                    token: refresh_token,
                },
            });

            if (!(info instanceof StorageError) && info.ret === 0) {
                return Storage.userCreate(info.data);
            }

            info.type = 'logout';
            info.id = id;
            Storage.remove({
                point: Storage.config.userTokenKey
            });

            return info;
        });
    },
};

const Api = extend({
    timeout: 10 * 1000,
    errorHandler
});

Api.interceptors.request.use((url: string, options: ApiOptionsType) => {
    const http = url.indexOf('http') === 0;
    const uri = http ? url : url.replace('../', '');

    const { token, headers = {}, retry = { count: 5, num: 1 } }: {
        headers: HeadersInit;
        retry: {
            count: number;
            num: number;
        };
        token: null|UserTokenType;
    } = options;

    /*if (url === 'shop') {
        controller.abort();
        return;
    }*/

    headers['Accept'] = 'application/json';
    if (token) {
        headers['Authorization'] = `Bearer ${token.access_token}`;
    }
    
    return {
        url: uri === url ? (http ? uri : `${API_URL}${PREFIX_URI}/${uri}`): `${API_URL}/${uri}`,
        options: {
            ...options,
            headers,
            retry,
        },
    };
});

Api.interceptors.response.use(async (response, options: ApiOptionsType) => {
    const { url, status, headers: res_header } = response;
    if (res_header.has('x-signature')) {
        const signature: Record<string, string> = JSON.parse(
            decodeURIComponent(res_header.get('x-signature'))
        );
        const { seter } = Storage.signature<SignatureType>();
        Object.keys(signature).forEach(key => seter(key, signature[key]));
    }
    if ((status >= 200 && status < 300) || [400, 403, 404, 500].indexOf(status) >= 0) {
        return response;
    }

    const { headers, id, retry, point = '', token = {}, ...opts } = options;
    let statusData = {};

    try {
        statusData = await response.json();
    } catch (e) {}

    if (status === 429 && statusData.ret !== 13) {
        response.statusData = statusData;
        return response;
    }

    if (retry.num >= retry.count) {
        return new StorageError({
            api: url,
            ret: status,
            message: '错误请求次数太多，请稍后重试',
            data: statusData,
        });
    }

    // Create new promise to handle exponential backoff
    const backoff = () => new Promise(resolve => {
        setTimeout(() => resolve(), status === 429 ? 2000 : 500);
    });

    retry.num++;
    if (status === 401) {
        const { refresh_token = null } = token;
        const { ret = 1 } = statusData;

        if (ret === 11 && refresh_token !== null && url.indexOf(REFRESH_URL) < 0) {
            const token_new: UserTokenType|StorageError = await UserToken.refresh(refresh_token, id).then(info => info).catch(err => err);
            
            if (get(token_new, 'access_token', '') !== '') {
                const newOptions = {
                    ...opts,
                    point,
                    headers,
                    id,
                    retry,
                };

                return await ('' !== point ? Api[point](url, newOptions) : Api(url, newOptions));
            }
            return Promise.reject(token_new);
        }
        return response;
    }

    await backoff();
    return await Api(url, {
        ...options,
        retry,
    });
});

// 异步执行返回流程，见：https://codesandbox.io/s/yi-bu-huo-qu-yi-chang-fan-hui-jie-guo-zhuang-tai-z3umzw
const ucfirst = ([first, ...rest]) => first.toUpperCase() + rest.join('');
['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
    const point = ucfirst(method);
    Api[point] = (url, options = {}) => apiQueue(url, options).then(async ({ id, token }: { id: number, token: null|UserTokenType }) => {
        const res = await Api[method](url, {
            ...options,
            point,
            signal,
            token,
            id,
        });

        id > 0 && apiQueueOut(id);
        return res;
    }).catch((info: {
        type?: string;
        id?: number;
    }) => {
        const { type = '', id = 0 } = info;

        id > 0 && apiQueueOut(id);
        if (type === 'apiWait') return Api[point](url, options);

        type === 'logout' && alert('登录失效了');

        /*type === 'logout' && Modal.error({
            title: '登录失效了',
            content: '点击“重新登录”按钮将跳转至登录页',
            okText: '重新登录',
            afterClose: () => history.replace(LOGIN_URL),
        });*/
        return info;
    });
});

export async function getSignature(list: string[], reget: boolean = false): Promise<SignatureIndexType> {
    const { geter } = Storage.signature<SignatureType>();
    const signature = geter();
  
    const action = list.filter(key => signature[key] === undefined);
    if (action.length === 0) return signature;

    await Api.Post('token', {
        data: { action }
    });
    return reget ? geter() : signature;
};

export default Api;